<script lang="ts" setup>
import BasicMd from "./ProInputBasic.md";
import SlotMd from "./ProInputSlot.md";
import TypeMd from "./ProInputType.md";
import PropsDesc from "@/components/PropsDesc.vue";

const propsData = [
  {
    prop: "modelValue",
    desc: "v-model双向绑定",
    type: "string | number",
    choose: "",
    default: "",
  },
  {
    prop: "fieldProps",
    desc: "el-input 和 el-input-number 内置的参数",
    type: "object<ProInputFieldPropsType>",
    choose: "",
    default: `{
        type: "text",
        placeholder: "请输入",
        clearable: true,
        controlsPosition: "right"
      }`,
  },
  {
    prop: "editable",
    desc: "是否可编辑",
    type: "boolean",
    choose: "",
    default: "true",
  },
  {
    prop: "formatConfig",
    desc: "只读态的配置，editable = false 时生效",
    type: "object<FormatConfigType>",
    choose: "",
    default: "",
  },
];
</script>

<template>
  <BasicMd />
  <SlotMd />
  <TypeMd />
  <PropsDesc title="ProInput 参数说明" :data="propsData" />
</template>
