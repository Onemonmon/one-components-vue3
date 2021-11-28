<template>
  <ProModalForm
    v-model="visible"
    :modal-props="{ title: 'Modal 表单' }"
    :form-props="{
      span: 12,
      columns,
      initialValues,
      formRef: (ref) => (formRef = ref),
    }"
    :onFinish="handleSubmit"
  >
    <template #trigger><el-button>内部新建表单</el-button></template>
  </ProModalForm>
  <el-button @click="visible = true">外部新建表单</el-button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import ProModalForm from "@/components/ProForm/ProModalForm.vue";
import type { ProFormItemPropsType } from "@/components/ProForm/type";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "Home",
  components: {
    ProModalForm,
  },
  setup() {
    async function getAddressOptions() {
      console.log("开始获取addressOptions");
      await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
      return [
        {
          label: `广东`,
          value: "guangdong",
          children: [
            { label: "潮汕", value: "chaoshan" },
            { label: "深圳", value: "shenzhen" },
          ],
        },
        {
          label: `福建`,
          value: "fujian",
          children: [
            { label: "泉州", value: "quanzhou" },
            { label: "厦门", value: "xiamen", disabled: true },
          ],
        },
      ];
    }
    const columns = reactive<ProFormItemPropsType[]>([
      {
        prop: "msg",
        children: [
          {
            prop: "name",
            label: "姓名",
            formProps: {
              rules: {
                required: true,
                message: "请输入姓名！",
              },
            },
          },
          {
            prop: "age",
            label: "年龄",
            formProps: {
              rules: {
                required: true,
                message: "请输入年龄！",
                trigger: "change",
              },
            },
            fieldProps: {
              clearable: false,
            },
          },
          {
            prop: "born",
            label: "出生日期",
            valueType: "date",
            fieldProps: {
              defaultValue: new Date("2021-11-10"),
            },
          },
          {
            prop: "clock",
            label: "闹钟",
            fieldProps: {
              type: "datetimerange",
              defaultValue: [new Date("2021-11-10"), new Date("2021-11-11")],
            },
            valueType: "date",
          },
        ],
      },
      {
        prop: "hobby",
        label: "爱好",
        formProps: {
          rules: {
            required: true,
            message: "请选择爱好！",
          },
        },
        options: [
          { label: "抽烟", value: "1" },
          { label: "喝酒", value: "2" },
          { label: "烫头", value: "3", disabled: true },
        ],
        fieldProps: {
          radioProps: {
            type: "radioButton",
          },
        },
        formatConfig: {
          dot: {
            style: {
              backgroundColor: "orange",
            },
          },
          color: "lightblue",
        },
        valueType: "radio",
      },
      {
        prop: "address",
        label: "地址",
        valueType: "select",
        request: getAddressOptions,
        fieldProps: {
          multiple: true,
        },
      },
    ]);
    const visible = ref<boolean>(false);
    const formRef = ref();
    const initialValues = reactive<any>({
      name: "张三",
      address: [],
      hobby: "1",
    });
    async function handleSubmit(values: any) {
      console.log("开始提交表单数据：", values, formRef);
      await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
      ElMessage({
        message: "提交成功",
        type: "success",
      });
    }
    return {
      formRef,
      visible,
      columns,
      initialValues,
      handleSubmit,
    };
  },
});
</script>
