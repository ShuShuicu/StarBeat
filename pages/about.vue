<script setup>
import { ref, onMounted } from 'vue';
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

// 定义仓库列表、错误信息和加载状态
const repos = ref([]);
const error = ref(null);
const loading = ref(true); // 新增加载状态

// 获取GitHub仓库信息
const fetchRepos = async () => {
    try {
        const { data } = await useFetch('https://api.github.com/users/ShuShuicu/repos');
        repos.value = data.value.map(repo => ({
            ...repo,
            color: getRandomColor(), // 为每个仓库随机分配颜色
        }));
    } catch (err) {
        error.value = err.message || '获取仓库信息失败，请稍后重试。';
    } finally {
        loading.value = false; // 加载完成
    }
};

// 生成随机颜色
const getRandomColor = () => {
    const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'];
    return colors[Math.floor(Math.random() * colors.length)];
};

// 在组件挂载后获取仓库信息
onMounted(fetchRepos);
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
            <div v-if="error">
                <p>{{ error }}</p>
            </div>
            <div v-else-if="loading">
                <v-skeleton-loader type="article"></v-skeleton-loader>
            </div>
            <div v-else-if="repos.length > 0">
                <div class="font-weight-bold ms-1 mb-2">GitHub参与/开源项目</div>

                <v-timeline align="start" density="compact">
                    <v-timeline-item v-for="repo in repos" :key="repo.id" :dot-color="repo.color" size="x-small">
                        <div class="mb-4">
                            <div class="font-weight-normal">
                                <strong>{{ repo.name }}</strong>
                            </div>
                            <div>{{ repo.description || '暂无描述' }}</div>
                            <div>
                                <a :href="repo.html_url" target="_blank">{{ repo.html_url }}</a>
                            </div>
                            <div style="margin-top: 10px;">
                                <v-chip small class="mr-2">⭐ {{ repo.stargazers_count }}</v-chip>
                                <v-chip small>🔁 {{ repo.forks_count }}</v-chip>
                            </div>
                        </div>
                    </v-timeline-item>
                </v-timeline>
            </div>
            <div v-else>
                <p>null</p>
            </div>
        </v-card-text>
    </v-card>
</template>