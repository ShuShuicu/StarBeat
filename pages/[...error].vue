<template>
    <v-empty-state :image="errorInfo.img" :title="errorInfo.title">
        <template #text>
            {{ errorInfo.text }}
            <br>如有疑问请联系：<a href="https://space.bilibili.com/435502585" target="_blank">哔哩哔哩</a>
        </template>
        <NuxtLink to="/">
            <v-btn color="blue">返回首页</v-btn>
        </NuxtLink>
    </v-empty-state>

</template>

<script setup lang="ts">
const route = useRoute()

// 状态码映射表
const errorMap = new Map([
    ['404', {
        img: '/assets/img/404.webp',
        title: '页面走丢了',
        text: '您访问的内容可能已被移出多元宇宙'
    }],
    ['500', {
        img: '/assets/img/502.webp',
        title: '服务器开小差',
        text: '我们的技术鼠鼠正在紧急修复中'
    }]
])

// 动态获取错误信息
const errorInfo = computed(() => {
    const code = route.query.code?.toString() || 'unknown'
    return errorMap.get(code) || {
        img: '/assets/img/404.webp',
        title: '未知错误',
        text: '发生了不可预料的异常'
    }
})
useHead({
    titleTemplate: () => {
        const code = route.query.code?.toString() || '未知'
        return `[${code}] 出错啦! | 鼠子Blog`
    },
    meta: computed(() => [
        { 
            name: 'description', 
            content: errorInfo.value.text + ' - 鼠子(Tomoriゞ)记录日常的小站' 
        }
    ])
})
</script>