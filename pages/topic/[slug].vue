<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '#imports';

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
        useHead({
            title: newCategoryData.name,
            titleTemplate: '%s - 鼠子Blog',
            meta: [
                { name: 'keywords', content: newCategoryData.name },
                { name: 'description', content: newCategoryData.description },
            ],
        });
    }
}, { immediate: true });

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
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

loadMorePosts();

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
        <p>Failed to load posts. Please try again later.</p>
    </div>
    <div v-else-if="posts.length > 0">
        <NuxtLink v-for="post in posts" :key="post.slug" :to="`/article/${post.slug}`">
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