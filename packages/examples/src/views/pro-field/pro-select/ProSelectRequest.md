### 自动请求选项数据

params 发生改变后，会再次触发 request

```vue
<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { OptionNodeType } from "one-components-vue3";

const inputValue = ref("01");
type ParamsType = { id: string };
const params = reactive<ParamsType>({ id: "" });
const loading = ref(false);
const getOptions = async ({ id }: ParamsType) => {
  loading.value = true;
  const res: OptionNodeType[] = await new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { label: "抽烟" + id, value: "01" },
          { label: "喝酒" + id, value: "02" },
          { label: "烫头" + id, value: "03" },
        ]),
      1000
    );
  });
  loading.value = false;
  return res;
};
</script>

<template>
  <el-space>
    <el-button
      :loading="loading"
      :style="{ marginRight: '12px' }"
      @click="params.id = `${Math.floor(Math.random() * 10000)}`"
    >
      重新请求
    </el-button>
    <pro-select v-model="inputValue" :params="params" :request="getOptions" />
  </el-space>
</template>
```
