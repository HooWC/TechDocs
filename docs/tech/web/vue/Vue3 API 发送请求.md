---
id: api-vue
slug: /api-vue
title: API 请求
date: 2024-11-04
authors: Hoo
tags: [vue]
keywords: [vue]
---

# Vue3 API 发送请求

使用 Axios 获取数据

```js
onMounted(() => {
	getList()
})

const getList = async () => {
	const res = await axios.get('/list')
	list.value = res.data
}
```

使用 Axios 删除数据

```js
const onDelete = async (id) => {
	await axios.delete('/del/${id}')
	getList()
}
```

使用 Axios 获取数据和搜寻数据

```js
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
```

















