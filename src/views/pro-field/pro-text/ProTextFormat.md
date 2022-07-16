### 格式化

```vue
<script lang="ts" setup>
import { FormatType } from "@components/shared/src/type";
import { OptionNodeType } from "one-components-vue3";
import { ref } from "vue";

const inputValue1 = ref("我是一个粉刷匠，粉刷本领强");
const inputValue2 = ref(1314520.1234);
const formatType = ref<FormatType>("digit");
const options: OptionNodeType[] = [
  {
    label: "数字",
    value: "digit",
  },
  {
    label: "百分比",
    value: "percent",
  },
  {
    label: "金钱",
    value: "money",
  },
];
</script>

<template>
  <pro-text
    :value="inputValue1"
    :style="{ marginBottom: '10px' }"
    :formatConfig="{ textFormat: (text) => `《粉刷匠》：${text}` }"
  />
  <el-space>
    <pro-radio v-model="formatType" type="button" :options="options" />
    <pro-text :value="inputValue2" :formatConfig="{ formatType }" />
  </el-space>
</template>
```
