<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref();
const search = ref('');
const dialog = ref(false); // 用于控制对话框的显示状态

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const listItems = [
  { title: 'Home', icon: 'mdi-home', link: '/' },
  { title: 'Search', icon: 'mdi-magnify', link: '/search' },
];

const router = useRouter();

const handleSearch = () => {
  if (search.value) {
    router.push({ path: '/search', query: { key: search.value } });
    dialog.value = false; // 关闭对话框
  }
};
</script>

<template>
  <v-app-bar scroll-behavior="hide" app>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>
      <router-link to="/">鼠子Blog</router-link>
    </v-app-bar-title>
    <template v-slot:append>
      <a href="https://github.com/ShuShuicu/StarBeat" target="_blank">
        <v-btn icon="mdi-heart"></v-btn>
        <v-tooltip activator="parent" location="start">点个Star叭!</v-tooltip>
      </a>

      <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn icon="mdi-magnify" variant="flat" v-bind="activatorProps"></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card prepend-icon="mdi-magnify" title="搜索">
            <v-card-text>
              <v-text-field label="请输入关键词" v-model="search" clearable></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn @click="dialog = false">关闭</v-btn>
              <v-btn color="primary" @click="handleSearch">搜索</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined">
    <v-list nav>
      <router-link v-for="item in listItems" :key="item.title" :title="item.title" :icon="item.icon" :to="item.link">
        <v-list-item :prepend-icon="item.icon" :title="item.title" :value="item.title" />
      </router-link>
      <v-divider></v-divider>
      <a href="https://space.bilibili.com/435502585" target="_blank">
        <v-list-item prepend-icon="mdi-video-box" title="Bilibili" value="bilibili" />
      </a>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="external nofollow noopener">
          <v-btn block>
            下北泽ICP备114514号
          </v-btn>
        </a>
      </div>
    </template>
  </v-navigation-drawer>
</template>