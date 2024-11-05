---
id: api-vue
slug: /api-vue
title: API Request
date: 2024-11-04
authors: Hoo
tags: [vue]
keywords: [vue]
---

# Vue3 API send request

Use Axios to get data

```js
onMounted(() => {
	getList()
})

const getList = async () => {
	const res = await axios.get('/list')
	list.value = res.data
}
```

Deleting data using Axios

```js
const onDelete = async (id) => {
	await axios.delete('/del/${id}')
	getList()
}
```

Using Axios to fetch and search data

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

















