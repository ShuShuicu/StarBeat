<script setup>
import { ref } from 'vue';
import { useHead } from '#imports';

const rules = [
    (v) => !!v || '请输入关键词',
    (v) => (v && v.length <= 20) || 'Max 20 characters',
];

useHead({
    title: '搜索',
    titleTemplate: '%s - 鼠子Blog',
    meta: [
        { name: 'keywords', content: '鼠子Blog, 技术, Vue, Nuxt, php, Typecho, WordPress' },
        { name: 'description', content: '鼠子の个人Blog, 分享经验记录生活。' },
    ],
});

const searchQuery = ref('');
const searchResults = ref([]); // 初始化为空数组
const loading = ref(false);
const error = ref(null);
const hasSearched = ref(false); // 新增标志位，标识是否执行过搜索

// 执行搜索
const performSearch = async () => {
    if (!searchQuery.value) {
        error.value = null; // 清空错误状态
        searchResults.value = []; // 清空搜索结果
        hasSearched.value = false; // 未执行搜索
        return;
    }

    loading.value = true;
    error.value = null;
    hasSearched.value = true; // 标识已执行搜索

    try {
        const { data } = await useFetch('/api/search', {
            params: {
                filterType: 'search',
                filterSlug: searchQuery.value,
                showDigest: 'excerpt',
                limit: 150,
            },
        });
        searchResults.value = data.value || []; // 如果 data.value 为 null 或 undefined，设置为空数组
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <v-card style="margin-bottom: 10px;">
        <v-text-field
            v-model="searchQuery"
            :rules="rules"
            hide-details="auto"
            label="输入关键词..."
            @keyup.enter="performSearch"
        ></v-text-field>
        <v-btn color="primary" @click="performSearch" :loading="loading">搜索</v-btn>
    </v-card>

    <div v-if="error">
        <p>搜索失败：{{ error }}</p>
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
</template>