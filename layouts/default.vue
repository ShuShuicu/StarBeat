<template>
    <v-app>
        <v-main>
            <div class="fill-height">
                <Drawer />
                <v-container>
                    <NuxtPage />
                </v-container>
            </div>
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