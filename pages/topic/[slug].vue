<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '#imports';

// 提取SEO配置到公共函数
const useSeo = (title, description, keywords) => {
    useHead({
        title,
        titleTemplate: '%s - 鼠子Blog',
        meta: [
            { name: 'keywords', content: keywords },
            { name: 'description', content: description },
        ],
    });
};

definePageMeta({
    ssr: true,
});

const route = useRoute();
const slug = route.params.slug;

const page = ref(1);
const pageSize = ref(5);
const posts = ref([]);
const loading = ref(false);
const error = ref(null);

// 获取分类信息
const { data: categoryData } = await useFetch(`/api/category?slug=${slug}`);

// 动态设置 SEO 信息
watch(categoryData, (newCategoryData) => {
    if (newCategoryData) {
        useSeo(
            newCategoryData.name,
            newCategoryData.description,
            newCategoryData.name
        );
    }
}, { immediate: true });

// 加载更多文章
const loadMorePosts = async () => {
    if (loading.value) return;
    loading.value = true;

    try {
        const { data } = await useFetch('/api/topic', {
            params: {
                page: page.value,
                pageSize: pageSize.value,
                filterType: 'category',
                filterSlug: slug,
                showDigest: 'excerpt',
            },
        });
        posts.value = [...posts.value, ...(data.value || [])];
        page.value++;
    } catch (err) {
        error.value = err.message || '加载文章失败，请稍后重试。';
    } finally {
        loading.value = false;
    }
};

// 初始化加载文章
loadMorePosts();

// 监听 slug 变化，重新加载文章
watch(
    () => route.params.slug,
    (newSlug) => {
        slug.value = newSlug;
        page.value = 1;
        posts.value = [];
        loadMorePosts();
    }
);
</script>

<template>
    <div v-if="error">
        <p>{{ error }}</p>
    </div>
    <div v-else-if="posts.length > 0">
        <NuxtLink v-for="post in posts" :key="post.slug" :to="`/article/${post.cid}`">
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
        <div v-if="posts.length % pageSize === 0 && posts.length > 0" class="text-center">
            <v-btn color="primary" @click="loadMorePosts" :loading="loading">加载更多</v-btn>
        </div>
    </div>
    <div v-else>
        <v-skeleton-loader type="article"></v-skeleton-loader>
    </div>
</template>