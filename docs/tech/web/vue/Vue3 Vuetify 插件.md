---
id: vuetify-vue
slug: /vuetify-vue
title: Vuetify
date: 2024-11-04
authors: Hoo
tags: [vue]
keywords: [vue]
---

# Vue3 Vuetify 插件

### 安装

```
npm create vuetify@latest #没有项目，就安装这个，同时安装了vue和vuetify
```

```
npm install vuetify@next #如果已经有项目直接安装这个   自动安装vue3
npm install @mdi/font // 安装
npm install @vitejs/plugin-vue --force --save-dev // ^5.1.4

npm install vite@latest  // 升级 @vitejs/plugin-vue 同一个版本   ^5.4.8
npm install laravel-vite-plugin@latest // 升级 ^1.0.5

npm install vue-router@next
npm install vue-loader@next vue-router@next --force

npm install vite-plugin-pages --save-dev

// 自动扫描Pages文件的文件 用在router里 方便
npm install vite-plugin-pages --save-dev

npm install @vueuse/core
```

### 配置

```js
// 在vite.config.js 配置
import Pages from 'vite-plugin-pages'

plugins: [
    vue(),
    Pages({
      // 指定需要扫描的目录
      dirs: ['./src/js/pages'], // 你可以根据自己的项目结构修改路径
    }),
  ],
```

```js
// 在vite.config.js 配置
import vue from '@vitejs/plugin-vue'

plugins:[
	...,
	vue()
]

// 修改 laravel信息
laravel({
            input: ['resources/js/main.js'],
            refresh: true,
        }),
```

### 最重要配置

```js
"type": "module",  // 在package.json 加上，才可以npm run dev
```

main.js 配置

```js
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import 'vuetify/dist/vuetify.css';
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(vuetify).mount('#app')
```



### 使用 更多看官网

```js
<v-btn fab>  #圆形
<v-icon left small>
<v-btn flat> #碰到才有背景颜色出现
depressed
large
class="pink white--text"
<v-btn class="hidden-md-and-down">click me</v-btn> #只有大才出现
<v-btn class="hidden-md-and-up">click me</v-btn> #只有小才出现
<v-btn class="hidden-sm-only">click me</v-btn> #只有sm才出消失
text-uppercase
font-weight-light
```

自定义 plugins/vuetify.js

```js
Vue.use(Vuetify, {
	iconfont: 'md',
	theme: {
		primary: '#999',
	}
})
```

























































