<script setup>
import { ref } from 'vue';
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

useSeo('出错啦', '这个页面走丢了哦~', '鼠子Blog');
</script>

<template>
    <v-card>
        <v-img src="/assets/images/very_sorry.png" cover></v-img>
        <v-card-text class="text-center">
            <v-btn color="primary" to="/">返回首页</v-btn>
        </v-card-text>
    </v-card>
</template>