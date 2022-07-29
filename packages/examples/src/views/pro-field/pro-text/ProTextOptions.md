### 从 options 中获取展示文本

```vue
<script lang="ts" setup>
import { ref } from "vue";
import type { OptionNodeType } from "one-components-vue3";

const inputValue = ref("02");
const options: OptionNodeType[] = [
  { label: "抽烟", value: "01" },
  { label: "喝酒", value: "02" },
  { label: "烫头", value: "03" },
];
</script>

<template>
  <el-space>
    <pro-radio v-model="inputValue" :options="options" />
    <pro-text
      :value="inputValue"
      :options="options"
      :formatConfig="{ color: 'red' }"
    />
  </el-space>
</template>
```
