### 圆点展示

```vue
<script lang="ts" setup>
import { ref } from "vue";

const inputValue = ref(["我是一个粉刷匠", "粉刷本领强"]);
</script>

<template>
  <pro-text :value="inputValue" :formatConfig="{ dot: true }" />
</template>
```
