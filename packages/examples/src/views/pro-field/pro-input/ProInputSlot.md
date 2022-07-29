### 插槽

```vue
<script lang="ts" setup>
import { ref } from "vue";

const inputValue = ref("我是一个粉刷匠");
</script>

<template>
  <pro-input v-model="inputValue">
    <template #prepend>Http://</template>
    <template #append>.com</template>
  </pro-input>
</template>
```
