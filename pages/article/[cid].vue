<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAsyncData, useHead } from '#imports';
import { fetchArticle } from '~/composables/api';

definePageMeta({
    ssr: true, // 指定该页面支持服务端渲染
});

// 获取路由参数
const route = useRoute();
const cid = route.params.cid;

// 获取文章数据
const { data: article, error } = await useAsyncData(`article-${cid}`, () => fetchArticle(cid));

// 动态设置 SEO 信息
watch(article, (newArticle) => {
    if (newArticle) {
        useHead({
            title: `${newArticle.title}`,
            meta: [
                { name: 'keywords', content: `${newArticle.categories.map(cat => cat.name).join(', ')}` },
                { name: 'description', content: newArticle.digest.replace(/<[^>]*>/g, '').substring(0, 150) },
            ],
        });
    }
}, { immediate: true });
</script>

<template>
    <div v-if="error">
        <p>Failed to load article. Please try again later.</p>
    </div>
    <div v-else-if="article">
        <a-card>
            <template #title>
                <div style="text-align: center;">{{ article.title }}</div>
            </template>
            <div v-html="article.text"></div>
        </a-card>
    </div>
    <div v-else style="text-align: center;">
        <a-spin size="large" />
    </div>
</template>