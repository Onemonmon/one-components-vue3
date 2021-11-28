<template>
  <el-card>
    <ProForm
      ref="formRef"
      :initial-values="initialValues"
      :columns="columns"
      :editable="editable"
      :form-props="{}"
      :span="6"
      :on-finish="handleSubmit"
    />
  </el-card>
  <el-card style="width: 300px">
    <el-button type="primary" plain @click="addressParams.id += 'x'">
      修改addressParams
    </el-button>
    <el-button type="primary" plain @click="changeInitialValues">
      修改initialValues
    </el-button>
    <el-button type="primary" plain @click="editable = !editable">
      修改表单编辑状态
    </el-button>
  </el-card>
  <el-card>
    <p>姓名：{{ initialValues.name }}</p>
    <p>地址：{{ initialValues.address }}</p>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import ProForm from "@/components/ProForm/ProForm.vue";
import type { ProFormItemPropsType } from "@/components/ProForm/type";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "Home",
  components: {
    ProForm,
  },
  setup() {
    const editable = ref<boolean>(true);
    async function getAddressOptions(params: any) {
      console.log("开始获取addressOptions，参数是：", params);
      await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
      return [
        {
          label: `广东${params.id}`,
          value: "guangdong",
          children: [
            { label: "潮汕", value: "chaoshan" },
            { label: "深圳", value: "shenzhen" },
          ],
        },
        {
          label: `福建${params.id}`,
          value: "fujian",
          children: [
            { label: "泉州", value: "quanzhou" },
            { label: "厦门", value: "xiamen", disabled: true },
          ],
        },
      ];
    }
    const addressParams = reactive({ id: "xxx" });
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
            span: 4,
          },
          {
            prop: "clock",
            label: "闹钟",
            fieldProps: {
              type: "datetimerange",
            },
            valueType: "date",
            span: 8,
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
        valueType: "radio",
      },
      {
        prop: "address",
        label: "地址",
        valueType: "select",
        request: getAddressOptions,
        params: addressParams,
        fieldProps: {
          multiple: true,
        },
      },
    ]);
    const initialValues = reactive<any>({
      name: "张三",
      address: [],
      hobby: "1",
    });
    async function handleSubmit(values: any) {
      console.log("开始提交表单数据：", values);
      await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
      ElMessage({
        message: "提交成功",
        type: "success",
      });
    }
    function changeInitialValues() {
      initialValues.address = ["shenzhen"];
    }
    return {
      editable,
      columns,
      initialValues,
      addressParams,
      handleSubmit,
      changeInitialValues,
    };
  },
});
</script>
