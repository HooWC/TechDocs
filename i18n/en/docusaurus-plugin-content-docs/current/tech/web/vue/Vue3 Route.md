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

## Install

```
npm install --save vue-router
```

`main.js` import

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



### Route File

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





# Secondary routing entry `Children`

### Route File

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login/index.vue';
import Layout from '@/views/Layout/index.vue';
import Home from '@/views/Home/index.vue';
import Category from '@/views/Category/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [ // Note that this is children and in array form
        {
          path: '', // Empty path for the default child route
          component: Home,
        },
        {
          path: 'category',
          component: Category,
        },
      ],
    },
    {
      path: '/login',
      component: Login,
    },
  ],
});

export default router;
```

### Layout/index.vue

```html
<template>
    <div>I'm the homepage</div>
    
    <!-- Secondary route entry -->
    <router-view></router-view>
</template>
```

Other Usages

```html
<template>
  <div>
    <!-- Creating links with router-link -->
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
  </div>
</template>
```

## 404 Page Routing

```js
import NotFound from '@/views/NotFound/index.vue'

{
	// Wildcard route that matches all paths not matched by other routes
	path: '/:catchAll(.*)',
	component: NotFound // Use a dedicated component for handling 404 errors
},
```



## Data transfer

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













