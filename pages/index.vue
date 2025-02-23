<template>
    <NuxtLink v-for="post in posts" :key="post.cid" :to="`/article/${post.cid}`">
        <v-card style="margin-bottom: 20px;" hover>
            <v-img
                height="200px"
                :src="getThumbnail(post.digest)"
                cover
            ></v-img>
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

    <div v-if="showMoreButton" style="text-align: center;">
        <v-btn color="primary" @click="loadMore" :loading="loading">加载更多</v-btn>
    </div>
</template>

<script setup>
import { useApi } from '~/composables/api'
import { useAsyncData } from '#app'
import { ref, computed } from 'vue'

const { getPosts } = useApi()

const page = ref(1)
const loading = ref(false)
const posts = ref([])
const totalPages = ref(1)

const showMoreButton = computed(() => page.value < totalPages.value)

const { data: initialPosts } = await useAsyncData('posts', async () => {
    try {
        const response = await getPosts(5, page.value)
        if (response.status === 'success') {
            totalPages.value = response.data.pages // 初始化总页数
            return response.data.dataSet
        }
        throw new Error('Failed to fetch posts')
    } catch (error) {
        console.error('Error fetching posts:', error)
        return []
    }
})

posts.value = initialPosts.value

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
        page.value-- // 回滚页码
    } finally {
        loading.value = false
    }
}

// 工具函数
const truncateDigest = (digest) => {
    const plainText = digest.replace(/<[^>]+>/g, '')
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText
}

const getCategoryNames = (categories) => {
    return categories.map(category => category.name).join(', ')
}

const formatDate = (date) => {
    const year = date.year
    const month = String(date.month).padStart(2, '0')
    const day = String(date.day).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const getThumbnail = (digest) => {
    const imgMatch = digest.match(/<img[^>]+src="([^">]+)"/)
    if (imgMatch?.[1]) return imgMatch[1]
    
    const randomIndex = Math.floor(Math.random() * 16)
    return `/assets/img/thumbnail/${randomIndex + 1}.webp`
}

definePageMeta({ ssr: true })

useHead({
    titleTemplate: (titleChunk) => 
        titleChunk ? `${titleChunk} - 忘れてやらない` : '鼠子Blog',
    meta: [
        { name: 'keywords', content: '鼠子,Tomori,ShuShuicu' },
        { name: 'description', content: '鼠子(Tomoriゞ)记录日常的小站' }
    ],
})
</script>