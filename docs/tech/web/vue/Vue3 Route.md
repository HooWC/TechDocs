---
id: route-vue
slug: /route-vue
title: Vue Route
date: 2024-11-04
authors: Hoo
tags: [vue]
keywords: [vue]
---

# Vue3 Route

## 安装

```
npm install --save vue-router
```

`main.js` 引入

```javascript
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```



### Route 文件

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout
    },
    {
      path: '/login',
      component: Login
    },
  ]
})

export default router
```

### Layout/index.vue

```html
<template>
  <router-view></router-view>
</template>
```





# 二级路由入口 `Children`

### Route 文件

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [ // 注意这里是 children，而且是数组形式
        {
          path: '', // 子路由路径为空，表示默认路由
          component: Home,
        },
        {
          path: 'category',
          component: Category,
        },
      ]
    },
    {
      path: '/login',
      component: Login
    },
  ]
})

export default router
```

### Layout/index.vue

```html
<template>
    <div>我是首页</div>
    
    <!-- 二级路由入口 -->
    <router-view></router-view>
</template>
```

其他用法

```html
<template>
  <div>
    <!-- 使用 router-link 创建链接 -->
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
  </div>
</template>
```

## 404页面路由

```js
import NotFound from '@/views/NotFound/index.vue'

{
	// 通配符路由，匹配所有未被其他路由匹配到的路径
	path: '/:catchAll(.*)',
	component: NotFound // 使用专门用于处理404的组件
},
```



## 传数据

```js
<router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }">
      <img
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="rounded-t-xl w-full h-48 object-cover"
      />
</router-link>
```

```js
 {
   path: '/meal/:id',
   name: 'mealDetails',
   component: MealDetails
 }
```

```js
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const mealId = route.params.id;
</script>
```













