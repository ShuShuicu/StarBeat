import VueLazyload from 'vue-lazyload';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueLazyload, {
        preLoad: 1.3,
        error: '/assets/img/loading_error.svg', // 错误图片
        loading: '/assets/img/loading.svg', // 默认图片
        attempt: 1
    })
})