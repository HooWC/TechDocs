---
id: vue-base
slug: /vue-base
title: Basic Learning
date: 2024-11-04
authors: Hoo
tags: [vue]
keywords: [vue]
---

# Vue3

Vue.js is a popular front-end JavaScript framework for building user interfaces and single-page applications (SPAs). Vue 3 is the latest version of Vue.js

### Install `Vue` project

```
npm init vue@latest
```

```
npm create vue@latest //Install in other backends
```

### Install `NPM`

```
npm i
```

### Install `Axios` (if needed)

```
npm i axios
```

### Startup

```
npm run dev
```

## Vue Basics

Add to `.eslintrc.cjs` file, you can name the file whatever you want **(if needed, you can ignore it)**

```js
  rules: {
    'vue/multi-word-component-names': 0, // Invitation component naming is no longer mandatory
  }
```

**Differences:**

- `reactive` is applicable to wrapped objects and applies to all properties of the object.
- `ref` is applicable to wrapped single values ​​and needs to use `.value` to access and update the value.

### Reactive Usage

```js
import { reactive } from 'vue'

const state = reactive({
  count: 0
})

// Access properties
console.log(state.count) // Output: 0

// Update properties
state.count++

console.log(state.count) // Output: 1
```

### Ref usage
```js
import { ref } from 'vue'

const count = ref(0)

// Access property
console.log(count.value) // Output: 0

// Update property
count.value++

console.log(count.value) // Output: 1
```

### Computed usage

#### Automatically recalculate and then output

```js
import { computed } from 'vue'

const list = ref([1,2,3,4,5,6,7,8])

const computedList = conputed(() => {
	return list.value.filter(item => item > 2);
})

setTimeout(() => {
	list.value.push(9,10);
})
```

### Watch function

```js
import { ref, watch } from 'vue'
const count = ref(0)

watch(count, (newValue, oldValue) => {
	console.log('count has changed, the old value is ${oldValue}, the new value is ${newValue}')
})
```

### Watch Function Listen to changes

```js
import { ref, watch } from 'vue'
const count = ref(0)
const name = ref('cp')

watch(
	[count, name], 
	([newCount, newName], [oldCount, oldName]) => {
	    console.log('count or name has changed, [newCount, newName], [oldCount, oldName]')
	}
)
```

### Watch Function Deep Mode

```js
import { ref, watch } from 'vue'
const state = ref({ count: 0})
const changeStateByCount = () => {
	state.value.count++
}

watch(state, () => {
	console.log('count changed')
}, {
	deep: true
})
```

### Watch Function Deep Mode (Watch starts only when a specific value changes)

```js
import { ref, watch } from 'vue'
const state = ref({ 
	name: 'Hoo',
	age: 18
})

const changeName = () => {
	state.value.name = 'Superman'
}

watch(
	() => state.value.age,
	() => {
		console.log('age has changed')
	}
)
```

### v-for

```vue
<ul>  
    <li v-for="(item, index) in list" :key="index">{{ item }}</li> 
</ul>
```

### v-if

```vue
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else>
  C
</div>
```

### v-show

```vue
<div v-show="isVisible">
  Display content
</div>
```

### @click

```vue
<button @click="handleClick">Click me</button>
```

### v-model

```vue
<script setup>
	import { ref } from 'vue';

	const inputValue = ref('');
</script>

<template>
  <div>
    <input type="text" v-model="inputValue">
  </div>
</template>
```



## Provide And Inject
Parent Component
```vue
provide('data-key','this is room data')
```

Other subcomponents

```vue
const roomData = inject('data-key')
```



## Route

`Route` File

```js
import {createRouter, createWebHistory} from "vue-router";
import invoiceIndex from "../components/invoices/index.vue";
import notFound from "../components/NotFound.vue";
import invoiceNew from '../components/invoices/new.vue';
import invoiceShow from '../components/invoices/show.vue';
import invoiceEdit from '../components/invoices/edit.vue';

const routes = [
    {
        path: '/',
        component: invoiceIndex
    },
    {
        path:'/invoice/new',
        component: invoiceNew
    },
    {
        path:'/invoice/show/:id',
        component: invoiceShow,
        props: true
    },
    {
        path:'/invoice/edit/:id',
        component:invoiceEdit,
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        component: notFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
```

Use

```vue
<router-view />
```

```vue
<router-link to="/">Back to home page</router-link>
```

### useRouter

```vue
<script setup>
    import axios from "axios";
    import { onMounted, ref } from "vue";
    import { useRouter } from "vue-router"

    const router = useRouter()

    let invoices = ref([])
    let searchInvoice = ref([])

    onMounted(async() => {
        getInvoices()
    })

    const getInvoices = async() => {
        let response = await axios.get("/api/get_all_invoice")
        //console.log('response',response)
        invoices.value = response.data.invoices
    }

    const search = async() => {
        let response = await axios.get('/api/search_invoice?s='+searchInvoice.value)
        //console.log('response',response.data.invoices)
        invoices.value = response.data.invoices
    }

    const newInvoice = () => {
        router.push('/invoice/new')
    }

    const onShow = (id) => {
        router.push('/invoice/show/'+id)
    }

</script>

<template>
    <div class="container">
        <div class="invoices">

            <div class="card__header">
                <div>
                    <h2 class="invoice__title">Invoices</h2>
                </div>
                <div>
                    <a class="btn btn-secondary" @click="newInvoice">
                        New Invoice
                    </a>
                </div>
            </div>

            <div class="table card__content">
                <div class="table--filter">
                <span class="table--filter--collapseBtn ">
                    <i class="fas fa-ellipsis-h"></i>
                </span>
                    <div class="table--filter--listWrapper">
                        <ul class="table--filter--list">
                            <li>
                                <p class="table--filter--link table--filter--link--active">
                                    All
                                </p>
                            </li>
                            <li>
                                <p class="table--filter--link ">
                                    Paid
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="table--search">
                    <div class="table--search--wrapper">
                        <select class="table--search--select" name="" id="">
                            <option value="">Filter</option>
                        </select>
                    </div>
                    <div class="relative">
                        <i class="table--search--input--icon fas fa-search "></i>
                        <input class="table--search--input" type="text" placeholder="Search invoice"
                        v-model="searchInvoice" @keyup="search()">
                    </div>
                </div>

                <div class="table--heading">
                    <p>ID</p>
                    <p>Date</p>
                    <p>Number</p>
                    <p>Customer</p>
                    <p>Due Date</p>
                    <p>Total</p>
                </div>

                <!-- item 1 -->
                <div class="table--items" v-for="item in invoices" :key="item.id" v-if="invoices.length">
                    <a href="#" @click="onShow(item.id)">
                        #{{item.id}}
                    </a>
                    <p>{{item.date}}</p>
                    <p>#{{item.number}}</p>
                    <p v-if="item.customer">
                        {{item.customer.firstname}}
                    </p>
                    <p v-else></p>
                    <p>{{item.due_date}}</p>
                    <p> $ {{item.total}}</p>
                </div>
                <div class="table--items" v-else>
                    <p>Invoice not found</p>
                </div>
            </div>

        </div>
    </div>
</template>
```

















