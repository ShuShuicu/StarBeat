<template>
    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined">
        <v-list>
            <v-list-item prepend-avatar="https://q.qlogo.cn/g?b=qq&nk=1778273540&s=100" subtitle="Tomori@miomoe.cn"
                title="鼠子ゞ"></v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list density="compact" nav>
            <router-link v-for="(item, index) in navItems" :key="index" :to="item.to">
                <v-list-item :prepend-icon="item.icon" :title="item.title" :value="item.value" />
            </router-link>
            <v-divider></v-divider>
            <a href="https://space.bilibili.com/435502585" target="_blank">
                <v-list-item prepend-icon="mdi-account" title="哔哩哔哩" value="bilibili" />
            </a>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <a href="https://beian.miit.gov.cn/" target="_blank" rel="external nofollow noopener">
                    <v-btn block>
                        鲁ICP备2023052135号-3
                    </v-btn>
                </a>
            </div>
        </template>
    </v-navigation-drawer>

    <v-app-bar scroll-behavior="hide" app>
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>
            <router-link to="/">鼠子Blog</router-link>
        </v-app-bar-title>

        <template v-slot:append>
            <a href="https://github.com/ShuShuicu/StarBeat" target="_blank"><v-btn icon="mdi-star"></v-btn></a>
            <v-tooltip activator="parent" location="start">点个Star叭!</v-tooltip>
        </template>
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            drawer: null,
            navItems: [
                { icon: 'mdi-home', title: '首页', value: 'home', to: '/' },
                { icon: 'mdi-book', title: '归档', value: 'archives', to: '/archives' },
                { icon: 'mdi-link', title: '友情链接', value: 'links', to: '/links' },
            ],
        }
    },
}
</script>
