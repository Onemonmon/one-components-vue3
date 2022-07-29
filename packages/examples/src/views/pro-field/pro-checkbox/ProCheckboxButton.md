### 按钮样式

颜色属性只能在 button 类型的单选里生效

```vue
<script lang="ts" setup>
import { ref } from "vue";
import type { OptionNodeType } from "one-components-vue3";

const inputValue = ref(["01"]);
const options: OptionNodeType[] = [
  { label: "抽烟", value: "01" },
  { label: "喝酒", value: "02" },
  { label: "烫头", value: "03" },
];
</script>

<template>
  <pro-checkbox
    v-model="inputValue"
    :options="options"
    :field-props="{
      type: 'button',
      checkboxGroup: {
        fill: 'green',
        textColor: 'orange',
      },
    }"
  />
</template>
```
