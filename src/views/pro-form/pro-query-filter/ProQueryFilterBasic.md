### 基本使用

```vue
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import type { OptionNodeType } from "one-components-vue3";

const inputValue = ref(["01"]);
const options = ref<OptionNodeType[]>([
  { label: "抽烟", value: "01" },
  { label: "喝酒", value: "02" },
  { label: "烫头", value: "03" },
]);
const initialValues = ref({});
const columns = ref([
  {
    prop: "name",
    label: "姓名",
    tip: "<span style='color: red;'>这是姓名鸭！</span>",
    formProps: {
      rules: {
        type: "string",
        required: true,
        message: "请输入姓名！",
        trigger: "blur",
      },
    },
    minWidth: 120,
  },
  {
    prop: "money",
    label: "余额",
    fieldProps: { type: "number", min: 1000, max: 20000 },
    formProps: {
      rules: { type: "number", required: true, message: "请输入余额！" },
    },
    width: 160,
  },
  {
    prop: "gender",
    label: "性别",
    request: () => [
      { label: "男", value: "male" },
      { label: "女", value: "female" },
    ],
    valueType: "radio",
    width: 160,
  },
  {
    prop: "hobby",
    label: "爱好",
    options: options.value,
    formProps: {
      rules: { type: "array", required: true, message: "请选择爱好！" },
    },
    hideInForm: (model) => model.gender === "female",
    valueType: "checkbox",
    width: 240,
  },
  {
    prop: "major",
    label: "专业",
    options: options.value,
    fieldProps: { clearable: false },
    valueType: "select",
    width: 140,
  },
]);
const handleSubmit = async (model) => {
  try {
    await new Promise((resolve, reject) =>
      setTimeout(() => {
        Math.random() > 0.5 ? resolve("") : reject();
      }, 1000)
    );
    ElMessage({ message: model.name + "保存成功", type: "success" });
  } catch {
    ElMessage({ message: model.name + "保存失败", type: "error" });
    return Promise.reject();
  }
};
onMounted(() => {
  setTimeout(() => {
    initialValues.value = {
      name: "张三",
      money: 10000,
      gender: "male",
      hobby: ["01", "02"],
      major: "03",
    };
  }, 1000);
});
</script>

<template>
  <pro-query-filter
    :columns="columns"
    :initialValues="initialValues"
    :onSubmit="handleSubmit"
  />
</template>
```
