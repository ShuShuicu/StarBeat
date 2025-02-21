<template>
    <v-card class="mx-auto">
        <!-- 加载完成状态 -->
        <template v-if="post">
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-subtitle>
                {{ formattedDate }} · {{ categoryNames }}
            </v-card-subtitle>
            <v-card-text class="NijikaPost">
                <div v-html="post.text"></div>
            </v-card-text>
        </template>

        <!-- 加载中状态 -->
        <template v-else>
            <v-card-title>
                <v-skeleton-loader type="heading" width="80%"></v-skeleton-loader>
            </v-card-title>
            <v-card-subtitle>
                <v-skeleton-loader type="text" width="200"></v-skeleton-loader>
                <v-skeleton-loader type="text" width="150" class="ml-2"></v-skeleton-loader>
            </v-card-subtitle>
            <v-card-text>
                <v-skeleton-loader type="paragraph@3" class="NijikaPost"></v-skeleton-loader>
            </v-card-text>
        </template>
    </v-card>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/api'
import { useAsyncData, useRoute, useHead, navigateTo } from '#app'
import { ref, watch, onMounted, nextTick, computed } from 'vue'

// 类型声明
interface PostCategory { name: string }
interface Post {
    title: string
    date: { year: string; month: string; day: string }
    text: string
    categories: PostCategory[]
    digest: string
}

const route = useRoute()
const { getPost } = useApi()
const post = ref<Post | null>(null)

// 计算属性
const formattedDate = computed(() => {
    if (!post.value?.date) return ''
    const { year, month, day } = post.value.date
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-')
})

const categoryNames = computed(() =>
    post.value?.categories?.map(c => c.name).join(', ') || '暂无分类'
)

// 页面初始化流程
const initializePage = async () => {
    // 路由参数校验
    const id = route.params.id
    if (!id || typeof id !== 'string') {
        await navigateTo({
            path: '/error',
            query: { code: '404', type: 'missing_id' },
            replace: true
        })
        return
    }

    // 数据请求处理
    const { data: postData } = await useAsyncData<Post>(`post-${id}`, async () => {
        try {
            const response = await getPost(id)
            if (response.status === 'success') return response.data
            throw new Error('API_ERROR:' + (response.message || 'Unknown error'))
        } catch (error: any) {
            console.error('文章获取失败:', error)
            await navigateTo({
                path: '/error',
                query: { code: '500', from: 'article_page' },
                replace: true
            })
            return null
        }
    })

    // 数据有效性校验
    if (!postData.value) {
        await navigateTo({
            path: '/error',
            query: { code: '404', attemptedId: id },
            replace: true
        })
        return
    }

    post.value = postData.value

    // SEO配置
    watch(post, (newPost) => {
        if (!newPost) return
        useHead({
            titleTemplate: (titleChunk: string | null) =>
                titleChunk ? `${newPost.title} - ${titleChunk}` : newPost.title,
            meta: [
                {
                    name: 'keywords',
                    content: newPost.categories.map(c => c.name).join(', ')
                },
                {
                    name: 'description',
                    content: newPost.digest
                        .replace(/<[^>]+>/g, '')
                        .substring(0, 150)
                }
            ]
        })
    }, { immediate: true })
}

// 执行初始化
initializePage().catch((error: any) => {
    console.error('页面初始化失败:', error)
    navigateTo({
        path: '/error',
        query: { code: '500', error: error.message }
    })
})

// 代码高亮处理
const highlightCode = async () => {
    await nextTick()
    if (process.client && window.Prism) {
        window.Prism.highlightAll()
    }
}

watch(post, highlightCode)
onMounted(highlightCode)
</script>

<style scoped>
.NijikaPost {
    white-space: pre-wrap;
    font-size: 17px;
    line-height: 1.5;
    word-wrap: break-word;
    font-family: 'Noto Sans SC', sans-serif;
}

/* 骨架屏适配样式 */
.v-skeleton-loader__heading {
    height: 36px;
    margin-bottom: 12px;
}

.v-skeleton-loader__text {
    height: 22px;
    margin-bottom: 8px;
}
</style>