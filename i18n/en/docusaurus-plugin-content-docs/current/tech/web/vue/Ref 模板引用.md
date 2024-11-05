---
id: ref-vue
slug: /ref-vue
title: Ref Template
date: 2024-11-04
authors: Hoo
tags: [vue]
keywords: [vue]
---

## Ref template reference

Parent component

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
	<h1 ref="h1Ref">I am the dom tag h1</h1>
	<Son ref="comRef" />
</template>
```

Subcomponents

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
	<h1>I am a son component</h1>
</template>
```



### Ref Template reference (pass by value)

Parent Component

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
	<h1 ref="h1Ref">I am the dom tag h1</h1>
	
	<button @click="onEdit(newName)">Change name</button>
	
	<Son ref="comRef" />
</template>
```

Subcomponents

```vue
<script setup>
	import { ref } from 'vue'
	
	const name = ref('Hoo')
	
	const setName = () => {
		name.value = 'Hoo'
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
	<h1>I am in the S-group</h1>
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



