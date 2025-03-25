<script setup>
import { ref } from 'vue';

const drawer = ref(true);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const listItems = [
  { title: 'Home', icon: 'mdi-home', link: '/' },
  { title: 'About', icon: 'mdi-information', link: '/about' },
];
</script>

<template>
  <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined">
    <v-list>
      <a href="https://space.bilibili.com/435502585" target="_blank">
        <v-list-item prepend-avatar="https://q.qlogo.cn/g?b=qq&nk=1778273540&s=640" subtitle="Tomori@miomoe.cn"
          title="鼠子ゞ"></v-list-item>
      </a>
    </v-list>
    <v-divider></v-divider>
    <v-list nav>
      <router-link v-for="item in listItems" :key="item.title" :title="item.title" :icon="item.icon" :to="item.link">
        <v-list-item :prepend-icon="item.icon" :title="item.title" :value="item.title" />
      </router-link>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar scroll-behavior="hide" app>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>
      <router-link to="/">鼠子Blog</router-link>
    </v-app-bar-title>
  </v-app-bar>
</template>
