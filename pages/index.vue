<script setup>
import { ref, watch } from 'vue';
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

const currentPage = ref(1);
const pageSize = 5;
const posts = ref([]);
const loading = ref(false);
const error = ref(null);

const loadMorePosts = async () => {
    if (loading.value) return;
    loading.value = true;

    try {
        const newPosts = await fetchPosts(currentPage.value, pageSize);
        posts.value = [...posts.value, ...newPosts];
        currentPage.value++;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

// 初始化加载第一页
loadMorePosts();
</script>

<template>
    <div v-if="error">
        <p>Failed to load posts. Please try again later.</p>
    </div>
    <div v-else-if="posts.length > 0">
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
        <div style="text-align: center;">
            <a-button :loading="loading" @click="loadMorePosts">加载更多</a-button>
        </div>
    </div>
    <a-card v-else>
        <div style="text-align: center;">
            <a-spin size="large" />
        </div>
    </a-card>
</template>