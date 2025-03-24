<script setup>
import { useAsyncData, useHead } from '#imports';
import { fetchPosts } from '~/composables/api';

definePageMeta({
    ssr: true, // 指定该页面支持服务端渲染
});

useHead({
    title: '鼠子Blog',
    titleTemplate: '%s - 忘れてやらない',
    meta: [
        { name: 'keywords', content: '鼠子Blog, 技术, Vue, Nuxt, php, Typecho, WordPress' },
        { name: 'description', content: '鼠子の个人Blog, 分享经验记录生活。' },
    ],
});

// 获取文章数据
const { data: posts, error } = await useAsyncData('posts', () => fetchPosts(1, 10));
</script>

<template>
    <div v-if="error">
        <p>Failed to load posts. Please try again later.</p>
    </div>
    <div v-else-if="posts">
        <NuxtLink v-for="post in posts" :key="post.cid" :to="`/article/${post.cid}`">
            <a-card style="margin-bottom: 20px;">
                <template #title>
                    {{ post.title }}
                </template>
                <template #extra>
                    <a-button type="link">{{ post.formattedDate }}</a-button>
                </template>
                {{ post.digest }}
            </a-card>
        </NuxtLink>
    </div>
    <div v-else style="text-align: center;">
        <a-spin size="large" />
    </div>
</template>