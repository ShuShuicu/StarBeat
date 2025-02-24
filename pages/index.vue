<template>
    <NuxtLink v-for="post in posts" :key="post.cid" :to="`/article/${post.cid}`">
        <v-card style="margin-bottom: 20px;" hover>
            <v-img height="200px" :src="getThumbnail(post.digest)" cover></v-img>
            <v-card-item>
                <v-card-title>
                    {{ post.title }}
                </v-card-title>

                <v-card-subtitle>
                    {{ formatDate(post.date) }} - {{ getCategoryNames(post.categories) }}
                </v-card-subtitle>
            </v-card-item>

            <v-card-text>
                <div v-html="truncateDigest(post.digest)" />
            </v-card-text>
        </v-card>
    </NuxtLink>

    <div v-if="page < totalPages" style="text-align: center;">
        <v-btn color="primary" @click="loadMore" :loading="loading">加载更多</v-btn>
    </div>
</template>

<script setup>
import { useApi } from '~/composables/api'
import { useAsyncData } from '#app'
import { ref } from 'vue'

const { getPosts } = useApi()

const page = ref(1)
const loading = ref(false)
const posts = ref([])
const totalPages = ref(0) // 新增总页数状态

// 初始化请求
const { data: initialData } = await useAsyncData('posts', async () => {
    try {
        const response = await getPosts(5, page.value)
        if (response.status === 'success') {
            totalPages.value = response.data.pages // 保存总页数
            return response.data.dataSet
        }
        throw new Error('Failed to fetch posts')
    } catch (error) {
        console.error('Error fetching posts:', error)
        return []
    }
})

posts.value = initialData.value

const loadMore = async () => {
    loading.value = true
    try {
        page.value++
        const response = await getPosts(5, page.value)
        if (response.status === 'success') {
            posts.value = [...posts.value, ...response.data.dataSet]
            totalPages.value = response.data.pages // 更新总页数
        }
    } catch (error) {
        console.error('Error fetching more posts:', error)
    } finally {
        loading.value = false
    }
}

// 以下工具函数保持不变
const truncateDigest = (digest) => {
    const plainText = digest.replace(/<[^>]+>/g, '')
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText
}

const getCategoryNames = (categories) => {
    return categories.map(category => category.name).join(', ')
}

const formatDate = (date) => {
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`
}

const getThumbnail = (digest) => {
    const imgMatch = digest.match(/<img[^>]+src="([^">]+)"/)
    if (imgMatch?.[1]) return imgMatch[1]

    const randomThumbnails = [
        '/assets/img/thumbnail/1.webp',
        '/assets/img/thumbnail/2.webp',
        '/assets/img/thumbnail/3.webp',
        '/assets/img/thumbnail/4.webp',
        '/assets/img/thumbnail/5.webp',
        '/assets/img/thumbnail/6.webp',
        '/assets/img/thumbnail/7.webp',
        '/assets/img/thumbnail/8.webp',
        '/assets/img/thumbnail/9.webp',
        '/assets/img/thumbnail/10.webp',
        '/assets/img/thumbnail/11.webp',
        '/assets/img/thumbnail/12.webp',
        '/assets/img/thumbnail/13.webp',
        '/assets/img/thumbnail/14.webp',
        '/assets/img/thumbnail/15.webp',
        '/assets/img/thumbnail/16.webp'
    ]
    return randomThumbnails[Math.floor(Math.random() * randomThumbnails.length)]
}

definePageMeta({ ssr: true })

useHead({
    titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} - 忘れてやらない` : '鼠子Blog',
    meta: [
        { name: 'keywords', content: '鼠子,Tomori,ShuShuicu' },
        { name: 'description', content: '鼠子(Tomoriゞ)记录日常的小站' }
    ],
})
</script>