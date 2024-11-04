---
id: ref-vue
slug: /ref-vue
title: Ref 模板
date: 2024-11-04
authors: Hoo
tags: [vue]
keywords: [vue]
---

## Ref 模板引用 

父组件

```vue
<script setup>
	import { onMounted, ref } from 'vue'
	import Son from './son-com.vue'
	
	const h1Ref = ref(null)
	const comRef = ref(null)
	
	onMounted(() => {
		console.log(h1Ref.value)
		console.log(comRef.value)
	})
</script>

<template>
	<h1 ref="h1Ref">我是dom标签h1</h1>
	<Son ref="comRef" />
</template>
```

子组件

```vue
<script setup>
	import { ref } from 'vue'
	
	const name = ref('Hoo')
	
	const setName = () => {
		name.value = 'Hoo Weng Chin'
	}
	
	defineExpose({
		name,
		setName
	})
	
</script>

<template>
	<h1>我是son组件</h1>
</template>
```



### Ref 模板引用 （传值）

父组件

```vue
<script setup>
	import { onMounted, ref } from 'vue'
	import Son from './son-com.vue'
	
	const h1Ref = ref(null)
	const comRef = ref(null)
	
	onMounted(() => {
		console.log(h1Ref.value)
		console.log(comRef.value)
	})
	
	const onEdit = (newName) => {
		comRef.value.EditName(newName)
	}
	
</script>

<template>
	<h1 ref="h1Ref">我是dom标签h1</h1>
	
	<button @click="onEdit(newName)">修改名字</button>
	
	<Son ref="comRef" />
</template>
```

子组件

```vue
<script setup>
	import { ref } from 'vue'
	
	const name = ref('Hoo')
	
	const setName = () => {
		name.value = 'Hoo Weng Chin'
	}
	
	const EditName = (newName) => {
		name.value = newName
	}
	
	defineExpose({
		name,
		setName
	})
	
</script>

<template>
	<h1>我是son组件</h1>
</template>
```

### Chilren (slot)

```vue
<template>
  <div>
    <Son>
      <span>this is span</span>
    </Son>
  </div>
</template>

<script>
import Son from './Son.vue';

export default {
  components: {
    Son
  }
}
</script>
```

```vue
<template>
  <div>
    <div>
      <div>this is son</div>
      <slot></slot>
    </div>
  </div>
</template>
```



