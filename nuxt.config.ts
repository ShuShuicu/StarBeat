// https://nuxt.com/docs/api/configuration/nuxt-config
import prismjs from 'vite-plugin-prismjs'
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
        { rel: 'icon', type: 'image/svg+xml', href: '/assets/images/Kasumi.svg' },
      ],
      script: [
        { src: '/assets/main.js', defer: true },
      ]
    }
  },
  vite: {
    plugins: [
      prismjs({
        languages: "all", 
        plugins: ['toolbar', 'show-language', 'copy-to-clipboard'],
        theme: "tomorrow.min",
        css: true
      })
    ]
  }
})