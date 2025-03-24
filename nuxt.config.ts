// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@ant-design-vue/nuxt',
    '@nuxtjs/seo'
  ],
  antd: {
    // Options
  },
  css: [
    '~/public/assets/main.scss'
  ],
  runtimeConfig: {
    public: {
      baseURL: 'https://blog.miomoe.cn/api',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      title: '鼠子Blog',
      titleTemplate: '%s - 鼠子Blog',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/assets/Kasumi.svg' },
      ],
    }
  },
});