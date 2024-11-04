---
id: pinia-vue
slug: /pinia-vue
title: Pinia
date: 2024-11-04
authors: Hoo
tags: [vue]
keywords: [vue]
---

# Vue3 Pinia

### Vue 3 Pinia 详解

Pinia 是一个用于 Vue.js 应用的状态管理库，它是 Vuex 的替代品，并在 Vue 3 中得到了优化和改进。Pinia 的设计理念是简单、灵活且与 Vue 3 的组合式 API 完美兼容。它不仅提供了强大的状态管理功能，还简化了许多常见的使用场景，使开发者能够更加高效地管理应用状态。以下是对 Pinia 的详细介绍，包括其核心特性、使用方式及优点。

### Pinia 的特点

- **简洁易用**：Pinia 提供了简单易懂的 API，使得开发者可以快速上手并实现复杂的状态管理。
- **类型支持**：Pinia 原生支持 TypeScript，提供更好的类型推断和开发体验。
- **模块化**：Pinia 允许将状态拆分为多个 store，每个 store 都可以独立管理其状态和逻辑，易于组织和维护。
- **与 Vue 3 组合式 API 的兼容性**：Pinia 与 Vue 3 的组合式 API 完美结合，能够与 Vue 的其他特性无缝配合。

### 安装 `Pinia`

```
npm install pinia
```

### 安装 `Axios`  (如有需要)

```
npm i axios
```

### `Main.js` 引入 Pinia

```javascript
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).mount('#app')
```

### 创建 `store` 文件

```javascript
import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import axios from "axios";

export const useCounterStore = defineStore('counter',() => {
    // 定义数据 (state)
    const count = ref(0)

    // 定义修改数据的方法 （action 同步+异步）
    const increment = () => {
        count.value++
    }

    // getter 定义 获取数据并对其进行处理，然后将结果返回给组件  计算属性
    const doubleCount = computed(() => count.value * 2)

    // 定义异步action
    const API_URL = 'http://geek.itheima.net/v1_0/channels'
    const list = ref([])
    const getList = async () => {
        const res = await axios.get(API_URL)
        list.value = res.data.data.channels  
    }

    // 以对象的方式return供组件使用
    return {
        count,
        increment,
        doubleCount,
        list,  
        getList,
    }
})
```

### vue 基本使用 pinia

```vue
<script setup>
  import { onMounted } from 'vue';
  import { useCounterStore } from './stores/counter';

  const counterStore = useCounterStore();

  onMounted(() => {
    counterStore.getList()
  })

</script>

<template>
  <button @click="counterStore.increment">{{  counterStore.count  }}</button>
  {{ counterStore.doubleCount }}

  <ul>
    <li v-for="item in counterStore.list" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>
```

### `storeToRefs` 写法

```vue
<script setup>
  import { onMounted } from 'vue';
  import { useCounterStore } from './stores/counter';
  import { storeToRefs } from 'pinia';

  const counterStore = useCounterStore();

  // 不能通过 storeToRefs 函数直接获取 store 中的方法
  const { count, doubleCount } = storeToRefs(counterStore);

  // 从 counterStore 中解构出 方法
  const { increment } = counterStore;

  onMounted(() => {
    counterStore.getList();
  });
</script>

<template>
  <button @click="increment">{{ count }}</button>
  {{ doubleCount }}

  <ul>
    <li v-for="item in counterStore.list" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>
```



























