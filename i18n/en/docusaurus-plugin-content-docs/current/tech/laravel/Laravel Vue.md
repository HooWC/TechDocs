---
id: laravel-vue
slug: /laravel-vue
title: Laravel + Vue
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

### Laravel Vue

```
npm create vue@latest # Install this
npm install @vitejs/plugin-vue --force --save-dev

npm run dev
```

```
npm install vue-loader@next vue@next vue-router@next # install
```

vite.config.js

```
import vue from '@vitejs/plugin-vue'

plugins:[
	...,
	vue()
]
```

app.js / main.js

```
import './bootstrap'

import { createApp } from 'vue'
import app from './components/app.vue'

createApp(app).mount('#app')
```

html

```
@vite('resource/css/app.css')
<div id="app"></div>
@vite('resource/js/app.js')
```

The more information View vue file

```
<style lang="scss">
@use "@core-scss/template/pages/page-auth.scss";
</style>
```

