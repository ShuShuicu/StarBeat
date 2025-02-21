# StarBeat~
> 星之鼓动~

## 介绍

StarBeat系统是一个基于Nuxt+Typecho的轻量级博客系统

### 快速开始


### Typecho
首先需要安装Typecho作为纯后端来使用
> https://github.com/typecho/typecho/releases/tag/v1.2.1

安装Typecho StarBeat专用插件
> https://github.com/ShuShuicu/typecho-plugin-Restful

### Nuxt

```bash
git clone https://github.com/ShuShuicu/StarBeat.git
```

#### 安装依赖
```bash
cd StarBeat
npm i @nuxtjs/seo
npm i prismjs
npm i nprogress
npm i -D vuetify vite-plugin-vuetify
npm i @mdi/font
```

#### 配置API接口
修改`nuxt.config.ts`中的`baseURL`配置
> 例如你的后端api域名为`api.example.com`则修改为`baseURL: 'https://api.example.com/api'`

#### 运行&构建
```bash
npm run dev
npm run build
```