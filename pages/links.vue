<template>
    <v-row>
        <v-col v-for="(link, index) in links" :key="index" cols="12" sm="6" md="3">
            <v-card :href="link.href" target="_blank" rel="noopener" append-icon="mdi-open-in-new"
                :subtitle="link.subtitle" :title="link.title">
                <v-card-text>
                    {{ link.description }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-card style="margin-top: 20px;">
        <v-card-text>
            不开放友链申请只加熟人的链接。
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { useHead } from '#app'

useHead({
    titleTemplate: (titleChunk: string | null | undefined) => {
        return titleChunk ? `友情链接 - ${titleChunk}` : '鼠子Blog'
    },
    meta: [
        { name: 'keywords', content: '鼠子,Tomori,ShuShuicu' },
        { name: 'description', content: '鼠子(Tomoriゞ)记录日常的小站' }
    ],
})

const links = [
    {
        href: 'https://github.com/ShuShuicu',
        title: 'GitHub',
        subtitle: 'https://github.com/ShuShuicu',
        description: '前往我的GitHub主页'
    },
    {
        href: 'https://gitee.com/ShuShuicu',
        title: 'Gitee',
        subtitle: 'https://gitee.com/ShuShuicu',
        description: '前往我的Gitee主页'
    },
    {
        href: 'https://www.rehiy.com',
        title: '若海の技术写真',
        subtitle: 'https://www.rehiy.com',
        description: '一个全栈攻城狮的纯技术干货分享'
    },
    {
        href: 'https://www.zibll.com/?ref=26762',
        title: '子比主题',
        subtitle: 'https://www.zibll.com',
        description: 'WordPress Zibll 子比主题官网'
    },
    {
        href: 'https://blog.unfinished.top',
        title: '机煲的小窝',
        subtitle: 'https://blog.unfinished.top',
        description: '机煲的小窝'
    },
    {
        href: 'https://www.scbkw.com/?ref=153',
        title: '苏晨博客',
        subtitle: 'https://www.scbkw.com',
        description: '苏晨博客，专注于为您提供丰富多样的资源分享平台。'
    },
    {
        href: 'https://www.yxqi.cn',
        title: '于小丘Blog',
        subtitle: 'https://www.yxqi.cn',
        description: '于小丘的博客提供最新的产品评测与编程技巧，为您分享有价值的科技信息和购买建议，逐步指导您掌握编程语言的各个方法。'
    },
    {
        href: 'https://147taiqiu.com',
        title: '木果博客',
        subtitle: 'https://147taiqiu.com',
        description: '木果资源分享博客，通过分享各类网络资源，帮助用户解决实际问题，促进资源共享和信息传递，提升用户体验'
    },
]
</script>