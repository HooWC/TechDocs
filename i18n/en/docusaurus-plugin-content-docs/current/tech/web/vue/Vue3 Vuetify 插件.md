---
id: vuetify-vue
slug: /vuetify-vue
title: Vuetify
date: 2024-11-04
authors: Hoo
tags: [vue]
keywords: [vue]
---

# Vue3 Vuetify plugin

### Installation

```
npm create vuetify@latest #If there is no project, install this, and install vue and vuetify at the same time
```

```
npm install vuetify@next #If there is already a project, install this directly to automatically install vue3
npm install @mdi/font // Installation
npm install @vitejs/plugin-vue --force --save-dev // ^5.1.4

npm install vite@latest // Upgrade @vitejs/plugin-vue Same version ^5.4.8
npm install laravel-vite-plugin@latest // Upgrade ^1.0.5

npm install vue-router@next
npm install vue-loader@next vue-router@next --force

npm install vite-plugin-pages --save-dev

// Automatically scan files for Pages files Used in router. Convenient
npm install vite-plugin-pages --save-dev

npm install @vueuse/core
```

### Configuration

```js
// In vite.config.js configuration
import Pages from 'vite-plugin-pages'

plugins: [
    vue(),
    Pages({
      // Specify the directory to scan
      dirs: ['./src/js/pages'], // You can modify the path based on your project structure
    }),
  ],

```

```js
// Configuration in vite.config.js
import vue from '@vitejs/plugin-vue'

plugins: [
    ...,
    vue()
]

// Modify Laravel configuration
laravel({
    input: ['resources/js/main.js'],
    refresh: true,
}),
```

### The most important configuration

```js
"type": "module", // Add to package.json to run npm run dev
```

main.js configuration

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



### Use more official website

```js
<v-btn fab> #circular
<v-icon left small>
<v-btn flat> #background color appears only when touched
depressed
large
class="pink white--text"
<v-btn class="hidden-md-and-down">click me</v-btn> ​​#only large will appear
<v-btn class="hidden-md-and-up">click me</v-btn> ​​#only small will appear
<v-btn class="hidden-sm-only">click me</v-btn> ​​#only sm will disappear
text-uppercase
font-weight-light
```

Custom plugins/vuetify.js

```js
Vue.use(Vuetify, {
	iconfont: 'md',
	theme: {
		primary: '#999',
	}
})
```

























































