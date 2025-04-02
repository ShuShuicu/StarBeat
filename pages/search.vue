<script setup>
import { ref, watch } from 'vue';
import { useHead, useRoute } from '#imports';

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

useSeo('搜索', '一个运行在StarBeat系统的高质量Blog~', '博客, 技术, 男娘');

const rules = [
    (v) => !!v || '请输入关键词',
    (v) => (v && v.length <= 20) || 'Max 20 characters',
];

const searchQuery = ref('');
const searchResults = ref([]);
const loading = ref(false);
const error = ref(null);
const hasSearched = ref(false);

const route = useRoute();

// 执行搜索
const performSearch = async () => {
    if (!searchQuery.value) {
        error.value = null;
        searchResults.value = [];
        hasSearched.value = false;
        return;
    }

    loading.value = true;
    error.value = null;
    hasSearched.value = true;

    try {
        const { data } = await useFetch('/api/search', {
            params: {
                filterType: 'search',
                filterSlug: searchQuery.value,
                showDigest: 'excerpt',
                limit: 150,
            },
        });
        searchResults.value = data.value || [];
    } catch (err) {
        error.value = err.message || '搜索失败，请稍后重试。';
    } finally {
        loading.value = false;
    }
};

// 初始化搜索关键词
if (route.query.key) {
    searchQuery.value = route.query.key;
    performSearch();
}

// 监听URL参数变化
watch(() => route.query.key, (newKey) => {
    if (newKey) {
        searchQuery.value = newKey;
        performSearch();
    }
});
</script>

<template>
    <v-card style="margin-bottom: 10px;">
        <v-card-actions>
            <v-text-field v-model="searchQuery" :rules="rules" hide-details="auto" label="输入关键词..."
                @keyup.enter="performSearch"></v-text-field>
            <v-btn color="primary" @click="performSearch" :loading="loading">搜索</v-btn>
        </v-card-actions>
    </v-card>

    <div v-if="error">
        <p>{{ error }}</p>
    </div>
    <div v-else-if="hasSearched && searchResults.length > 0">
        <NuxtLink v-for="post in searchResults" :key="post.cid" :to="`/article/${post.cid}`">
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
    </div>
    <div v-else-if="hasSearched && searchResults.length === 0 && !loading">
        <p>未找到相关文章。</p>
    </div>
    <div v-else-if="loading">
        <v-skeleton-loader type="article"></v-skeleton-loader>
    </div>
    <div v-else>
        <SearchCategories />
    </div>
</template>