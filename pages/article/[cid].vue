<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAsyncData, useHead } from '#imports';
import { fetchArticle } from '~/composables/api';
import * as Prism from 'prismjs'; // 修改后的导入方式
import 'prismjs/themes/prism-okaidia.min.css'; // 引入 Prism.js 的主题
import { nextTick } from 'vue';

definePageMeta({
    ssr: true, // 指定该页面支持服务端渲染
});

// 获取路由和参数
const route = useRoute();
const router = useRouter();
const cid = route.params.cid;

// 获取文章数据
const { data: article, error } = await useAsyncData(`article-${cid}`, () => fetchArticle(cid));

// 处理错误
watch(error, (newError) => {
    if (newError?.message === '500') {
        router.push('/error'); // 跳转到 /error 页面
    }
}, { immediate: true });

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

// 代码高亮处理
const highlightCode = async () => {
    await nextTick()
    if (process.client && window.Prism) {
        window.Prism.highlightAll()
    }
}

watch(article, highlightCode)
onMounted(highlightCode)
</script>

<template>
    <div v-if="error && error.message !== '500'">
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
    <a-card v-else>
        <div style="text-align: center;">
            <a-spin size="large" />
        </div>
    </a-card>
</template>