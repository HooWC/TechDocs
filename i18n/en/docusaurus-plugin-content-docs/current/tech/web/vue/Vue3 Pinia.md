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

### Vue 3 Pinia Detailed Explanation

Pinia is a state management library for Vue.js applications. It is a replacement for Vuex and has been optimized and improved in Vue 3. Pinia is designed to be simple, flexible, and perfectly compatible with Vue 3's Combination API. It not only provides powerful state management capabilities, but also simplifies many common usage scenarios, allowing developers to manage application states more efficiently. The following is a detailed introduction to Pinia, including its core features, usage methods, and advantages.

### Features of Pinia

- **Simple and easy to use**: Pinia provides a simple and easy-to-understand API, allowing developers to quickly get started and implement complex state management.
- **Type support**: Pinia natively supports TypeScript, providing better type inference and development experience.
- **Modularity**: Pinia allows the state to be split into multiple stores, each of which can manage its state and logic independently, making it easy to organize and maintain.
- **Compatibility with Vue 3 Composition API**: Pinia is perfectly integrated with Vue 3's Composition API and can work seamlessly with other Vue features。

### Install `Pinia`

```
npm install pinia
```

### Install `Axios`  (if necessary)

```
npm i axios
```

### `Main.js` import Pinia

```javascript
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).mount('#app')
```

### Create `store` File

```javascript
import { defineStore } from "pinia"; // Import defineStore from Pinia
import { computed, ref } from 'vue'; // Import computed and ref from Vue
import axios from "axios"; // Import axios for HTTP requests

// Define a store named 'counter'
export const useCounterStore = defineStore('counter', () => {
    // Define state data
    const count = ref(0); // Create a reactive count variable, initialized to 0

    // Define methods to modify data (synchronous + asynchronous actions)
    const increment = () => {
        count.value++; // Increment the count value
    };

    // Define a getter to retrieve and process data, returning a computed property
    const doubleCount = computed(() => count.value * 2); // Compute doubleCount as twice the count

    // Define asynchronous action
    const API_URL = 'http://geek.itheima.net/v1_0/channels'; // API URL
    const list = ref([]); // Create a reactive list variable to store data

    // Define an asynchronous function to fetch data
    const getList = async () => {
        const res = await axios.get(API_URL); // Make a GET request
        list.value = res.data.data.channels; // Assign the fetched channel data to the list
    };

    // Return an object for use in components
    return {
        count,
        increment,
        doubleCount,
        list,
        getList,
    };
});
```

### vue Basic Use pinia

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

### `storeToRefs` Writing

```vue
<script setup>
  import { onMounted } from 'vue'; // Import onMounted lifecycle hook from Vue
  import { useCounterStore } from './stores/counter'; // Import the counter store
  import { storeToRefs } from 'pinia'; // Import storeToRefs from Pinia

  const counterStore = useCounterStore(); // Create an instance of the counter store

  // Cannot directly get methods from the store using storeToRefs
  const { count, doubleCount } = storeToRefs(counterStore); // Destructure count and doubleCount as reactive references

  // Destructure methods from counterStore
  const { increment } = counterStore; // Get the increment method from the store

  onMounted(() => {
    counterStore.getList(); // Call getList to fetch data when the component is mounted
  });
</script>

<template>
  <button @click="increment">{{ count }}</button> <!-- Button to increment the count -->
  {{ doubleCount }} <!-- Display the doubled count -->

  <ul>
    <li v-for="item in counterStore.list" :key="item.id"> <!-- Loop through the list and display items -->
      {{ item.name }} <!-- Display the name of each item -->
    </li>
  </ul>
</template>
```



























