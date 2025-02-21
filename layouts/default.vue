<template>
    <v-app class="fill-height">
        <v-main>
            <Drawer />
            <v-container>
                <NuxtPage />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Bars from '~/components/Bars.vue';
import Drawer from '~/components/Drawer.vue';
import { ConfigProvider, theme } from 'ant-design-vue'

const darkTheme = {
    algorithm: theme.darkAlgorithm
}
export default {
    components: {
        Bars,
        Drawer,
    },
    data() {
        return {
            drawer: true,
        };
    },
};
</script>