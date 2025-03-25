<script setup>
import { ref } from 'vue';

const drawer = ref();

const dialog = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const listItems = [
  { title: 'Home', icon: 'mdi-home', link: '/' },
  { title: 'Search', icon: 'mdi-magnify', link: '/search' },
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
      <v-btn icon="mdi-heart"></v-btn>

      <v-btn icon="mdi-magnify" @click="dialog = true"></v-btn>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined">
    <v-list nav>
      <router-link v-for="item in listItems" :key="item.title" :title="item.title" :icon="item.icon" :to="item.link">
        <v-list-item :prepend-icon="item.icon" :title="item.title" :value="item.title" />
      </router-link>
    </v-list>
  </v-navigation-drawer>

  <v-dialog v-model="dialog" width="auto">
    <v-card width="400" prepend-icon="mdi-magnify" title="搜索">
      <template #text>
        <v-text-field label="搜索" v-model="search" />
      </template>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="关闭" @click="dialog = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>

</template>
