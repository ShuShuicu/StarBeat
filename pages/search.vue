<script setup>
const rules = [
    (v) => !!v || '请输入关键词',
    (v) => (v && v.length <= 20) || 'Max 20 characters',
]

useHead({
    title: '搜索',
    titleTemplate: '%s - 鼠子Blog',
    meta: [
        { name: 'keywords', content: '鼠子Blog, 技术, Vue, Nuxt, php, Typecho, WordPress' },
        { name: 'description', content: '鼠子の个人Blog, 分享经验记录生活。' },
    ],
});
</script>

<template>

<v-card>
    <v-text-field
        :rules="rules"
        hide-details="auto"
        label="输入关键词..."
    ></v-text-field>
</v-card>

</template>