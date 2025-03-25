<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAsyncData, useHead } from '#imports';
import { fetchArticle } from '~/composables/api';
import EasyLightbox from 'vue-easy-lightbox';
// 引入 Prism.js
import * as Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.min.css';
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
            titleTemplate: '%s - 鼠子Blog',
            meta: [
                { name: 'keywords', content: `${newArticle.categories.map(cat => cat.name).join(', ')}` },
                { name: 'description', content: newArticle.digest.replace(/<[^>]*>/g, '').substring(0, 150) },
            ],
        });
    }
}, { immediate: true });

// 格式化日期
const formattedDate = computed(() => {
    if (!article.value?.date) return '';
    const { year, month, day } = article.value.date;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
});

// 代码高亮处理
const highlightCode = async () => {
    await nextTick();
    if (process.client && window.Prism) {
        window.Prism.highlightAll();
    }
}

// 监听 article 变化，重新高亮代码
watch(article, highlightCode);

// 在组件挂载后高亮代码
onMounted(highlightCode);
</script>

<template>
    <div v-if="error && error.message !== '500'">
        <p>Failed to load article. Please try again later.</p>
    </div>
    <div v-else-if="article">
        <v-card :title="article.title">
            <template #subtitle>
                {{ formattedDate }} · {{article.categories.map(cat => cat.name).join(', ')}}
            </template>
            <v-card-text class="content">
                <div
                    v-html="article.text">
                </div>
                <div class="separator">THE END</div>
                <div>
                    <div><span>©</span> 版权声明</div>
                    <div>分享是一种美德，转载请保留原链接</div>
                </div>
            </v-card-text>
        </v-card>
    </div>
    <div v-else style="text-align: center;">
        <v-skeleton-loader type="article"></v-skeleton-loader>
    </div>
</template>

<style scoped>
.separator {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.separator::after,
.separator::before {
    content: '';
    background: #ffffff2e;
    max-width: 20%;
    height: 1px;
    margin: 0 1em;
    flex: 1;
}
</style>