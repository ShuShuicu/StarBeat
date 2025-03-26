<script setup>
import { ref } from 'vue';
import { useHead } from '#imports';

definePageMeta({
    ssr: true,
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
        const { data } = await useFetch('/api/list', {
            params: { page: currentPage.value, pageSize },
        });
        posts.value = [...posts.value, ...data.value];
        currentPage.value++;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

loadMorePosts();
</script>

<template>
    <div v-if="error">
        <p>Failed to load posts. Please try again later.</p>
    </div>
    <div v-else-if="posts.length > 0">
        <NuxtLink v-for="post in posts" :key="post.cid" :to="`/article/${post.cid}`">
            <v-card class="mx-auto" style="margin-bottom: 10px;" hover>
                <v-card-item>
                    <v-card-title>
                        {{ post.title }}
                    </v-card-title>

                    <v-card-subtitle>
                        {{ post.formattedDate }}
                    </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                    {{ post.digest }}...
                </v-card-text>
            </v-card>
        </NuxtLink>
        <div class="text-center">
            <v-btn color="primary" @click="loadMorePosts" :loading="loading">加载更多</v-btn>
        </div>
    </div>
    <div v-else>
        <v-skeleton-loader type="article"></v-skeleton-loader>
    </div>
</template>