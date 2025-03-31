<script setup>
import { ref } from 'vue';
import { useHead } from '#imports';

// 提取SEO配置到公共函数
const useSeo = (title, description, keywords) => {
    useHead({
        title,
        titleTemplate: '%s - 忘れてやらない',
        meta: [
            { name: 'keywords', content: keywords },
            { name: 'description', content: description },
        ],
    });
};

useSeo('鼠子Blog', '鼠子の个人Blog, 分享经验记录生活。', '鼠子Blog, 技术, Vue, Nuxt, php, Typecho, WordPress');

definePageMeta({
    ssr: true,
});

const currentPage = ref(1);
const pageSize = 5;
const posts = ref([]);
const loading = ref(false);
const error = ref(null);

// 加载更多文章
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
        error.value = err.message || '加载文章失败，请稍后重试。';
    } finally {
        loading.value = false;
    }
};

// 初始化加载文章
loadMorePosts();
</script>

<template>
    <div v-if="error">
        <p>{{ error }}</p>
    </div>
    <div v-else-if="posts.length > 0">
        <NuxtLink v-for="post in posts" :key="post.cid" :to="`/article/${post.cid}`">
            <v-card class="mx-auto" style="margin-bottom: 10px;" hover>
                <v-card-item>
                    <v-card-title>
                        {{ post.title }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ post.formattedDate }} · {{ post.categories.map(cat => cat.name).join(', ') }}
                    </v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    {{ post.digest }}...
                </v-card-text>
            </v-card>
        </NuxtLink>
        <div v-if="posts.length % pageSize === 0 && posts.length > 0" class="text-center">
            <v-btn color="primary" @click="loadMorePosts" :loading="loading">加载更多</v-btn>
        </div>
    </div>
    <div v-else>
        <v-skeleton-loader type="article"></v-skeleton-loader>
    </div>
</template>