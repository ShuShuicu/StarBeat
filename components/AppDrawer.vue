<script setup>
import { ref } from 'vue';

const drawer = ref();

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const listItems = [
  { title: 'Home', icon: 'mdi-home', link: '/' },
  { title: 'Search', icon: 'mdi-magnify', link: '/search' },
  { title: 'About', icon: 'mdi-account', link: '/about' },
];
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

      <NuxtLink to="/search">
        <v-btn icon="mdi-magnify"></v-btn>
      </NuxtLink>
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
            鲁ICP备2023052135号-2
          </v-btn>
        </a>
      </div>
    </template>
  </v-navigation-drawer>

</template>
