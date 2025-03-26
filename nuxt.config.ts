// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  routeRules: {
    '/article/**': {
      ssr: true,
      prerender: true // 启用预渲染
    }
  },
  modules: [
    '@nuxtjs/seo',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  build: {
    transpile: [
      'vueuc',
      'vuetify',
      'prismjs',
    ],
  },
  css: [
    '~/public/assets/main.scss',
  ],
  runtimeConfig: {
    public: {
      siteURL: 'https://blog.miomoe.cn',
      baseURL: 'https://api-v2.x-x.work/web/blog',
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