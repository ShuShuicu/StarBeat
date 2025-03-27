<script setup>
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

useSeo('关于', '关于鼠子的一些介绍', '鼠子, ShuShuicu, Tomori');

const messages = [
    {
        from: 'KonFans',
        time: '2024/11/27',
        color: 'primary',
        message: '轻音少女粉丝网站',
        github: 'https://github.com/ShuShuicu/KonFans',
    }
];
</script>

<template>
    <v-card class="mx-auto">
        <v-img class="align-end text-white" height="270" src="/assets/aboutBack.webp" cover>
            <v-card-title>About Me</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4">
            "でもね、会えたよ！すてきな天使に"
        </v-card-subtitle>

        <v-card-text>
            <div>
                <p>你好我是鼠子，业余时间写写代码，<del>DeepSeek/ChatGPT选手，啥都会点就是不精通</del></p>
            </div>
            <v-divider :thickness="2" style="margin: 10px 0 10px 0"></v-divider>
            <div class="font-weight-bold ms-1 mb-2">最有价值的开源项目</div>

            <v-timeline align="start" density="compact">
                <v-timeline-item v-for="message in messages" :key="message.time" :dot-color="message.color"
                    size="x-small">
                    <div class="mb-4">
                        <div class="font-weight-normal">
                            <strong>{{ message.from }}</strong> @{{ message.time }}
                        </div>

                        <div>{{ message.message }}</div>
                        <div><a :href="message.github" target="_blank">{{ message.github }}</a></div>
                    </div>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-card>
</template>