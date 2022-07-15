### 基本使用

与 el-input 的插槽使用相同

```vue
<script lang="ts" setup>
import { ref } from "vue";

const inputValue = ref("我是一个粉刷匠");
</script>

<template>
  <pro-input
    v-model="inputValue"
    :field-props="{ maxlength: 10, showWordLimit: true }"
  />
</template>
```
