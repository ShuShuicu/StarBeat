<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAsyncData, useHead } from '#imports';
import * as Prism from 'prismjs';
import { nextTick } from 'vue';
// 提取SEO配置到公共函数
const useSeo = (title, description, keywords) => {
    useHead({
        title,
        titleTemplate: '%s - StarBeat~',
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
const router = useRouter();
const cid = route.params.cid;

// 获取文章数据
const { data: article, error } = await useAsyncData(`article-${cid}`, () =>
    $fetch(`/api/article?cid=${cid}`)
);

// 处理错误
watch(error, (newError) => {
    if (newError?.message === '500') {
        router.push('/error');
    }
}, { immediate: true });

// 动态设置 SEO 信息
watch(article, (newArticle) => {
    if (newArticle) {
        useSeo(
            newArticle.title,
            newArticle.digest.replace(/<[^>]*>/g, '').substring(0, 150),
            newArticle.categories.map(cat => cat.name).join(', ')
        );
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
};

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
            <v-card-text>
                <div class="StarBeatTypo" v-html="article.text"></div>
                <div class="content-ds">
                    <p><span>© 转载请保留原链接</span></p>
                    <div class="content-ds-button">
                        <BiliPay />
                    </div>
                    <div class="content-ds-count"><span>还没有人充电，快来当第一个充电的人吧！</span></div>
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

.content-ds {
    display: flex;
    justify-content: center;
    flex-flow: column;
    margin-top: 10px;
    padding: 20px;
    border-radius: 3px;
    position: relative;
    background: #484848;
}
.content-ds-count {
    font-size: 12px;
    margin: 17px 0 5px;
}
.content-ds-button {
    position: absolute;
    right: 20px;
    top: 8px;
}
@media screen and (max-width: 768px) {
    .content-ds-button {
        top: 0;
        margin-top: 2em;
    }
}
</style>