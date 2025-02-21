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
  build: {
    transpile: [
      'vueuc',
      'vuetify',
    ],
  },
  css: [
    '~/public/assets/main.scss',
  ],
  modules: [
    '@nuxtjs/seo',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  runtimeConfig: {
    public: {
      baseURL: 'https://api-v2.x-x.work/web/blog/Data',
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      title: '鼠子Blog',
      meta: [
        { name: 'keywords', content: '鼠子,Tomori,ShuShuicu' },
        { name: 'description', content: '鼠子(Tomoriゞ)记录日常的小站' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/assets/Kasumi.svg' },
      ],
      script: [
        { src: '/assets/main.js' },
      ],
    }
  },
});