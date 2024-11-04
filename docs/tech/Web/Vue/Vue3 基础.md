---
id: vue-base
slug: /vue-base
title: 基础学习
date: 2024-11-04
authors: Hoo
tags: [vue]
keywords: [vue]
---

# Vue3

Vue.js 是一个流行的前端 JavaScript 框架，用于构建用户界面和单页面应用程序（SPA）。Vue 3 是 Vue.js 的最新版本



### 安装 `Vue` 项目

```
npm init vue@latest
```

```
npm create vue@latest   //在其他后端里安装
```

### 安装 `NPM`

```
npm i
```

### 安装 `Axios`  (如有需要)

```
npm i axios
```

### 启动 

```
npm run dev
```



## Vue 基础

在`.eslintrc.cjs`文件里添加， 可随意命名文件名称 **（如有需要，可以忽略）**

```js
  rules: {
    'vue/multi-word-component-names': 0, // 不再强制邀请组件命名
  }
```

**区别：**

- `reactive` 适用于包装对象，并且适用于对象的所有属性。
- `ref` 适用于包装单个值，并且需要使用 `.value` 来访问和更新值。

### Reactive 用法

```js
import { reactive } from 'vue'

const state = reactive({
  count: 0
})

// 访问属性
console.log(state.count) // 输出: 0

// 更新属性
state.count++

console.log(state.count) // 输出: 1
```

### Ref 用法

```js
import { ref } from 'vue'

const count = ref(0)

// 访问属性
console.log(count.value) // 输出: 0

// 更新属性
count.value++

console.log(count.value) // 输出: 1
```

### Computed 用法

#### 自动再次计算，然后输出

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

### Watch 函数

```js
import { ref, watch } from 'vue'
const count = ref(0)

watch(count, (newValue, oldValue) => {
	console.log('count发生了变化，老值为${oldValue}, 新值为${newValue}')
})
```

### Watch 函数 多听变化

```js
import { ref, watch } from 'vue'
const count = ref(0)
const name = ref('cp')

watch(
	[count, name], 
	([newCount, newName], [oldCount, oldName]) => {
	    console.log('count或者name发生了变化，[newCount, newName], [oldCount, oldName]')
	}
)
```

### Watch 函数 Deep模式

```js
import { ref, watch } from 'vue'
const state = ref({ count: 0})
const changeStateByCount = () => {
	state.value.count++
}

watch(state, () => {
	console.log('count变化了')
}, {
	deep: true
})
```

### Watch 函数 Deep模式 （特定值变化时才启动 Watch）

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
		console.log('age变化了')
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
  显示内容
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



## Provide和Inject
父组件
```vue
provide('data-key','this is room data')
```

其他 子组件

```vue
const roomData = inject('data-key')
```



## Route

`Route` 文件

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

使用

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

















