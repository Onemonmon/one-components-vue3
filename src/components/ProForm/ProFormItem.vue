<template>
  <el-form-item v-bind="formProps" :prop="prop" :label="label">
    <slot>
      <component
        v-model="model[prop]"
        :editable="editable"
        :request="request"
        :params="params"
        :options="options"
        :fieldProps="fieldProps"
        :is="getComponentByValueType(valueType)"
      />
    </slot>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ProInput from "../ProField/ProInput.vue";
import ProSelect from "../ProField/ProSelect.vue";
import ProRadio from "../ProField/ProRadio.vue";
import { getComponentByValueType } from "../utils";
import type { FormItemPropsType } from "./type";
import type { ProRadioFieldPropsType } from "../ProField/type";
import type {
  ProValueType,
  RequestOptionsFunctionType,
  OptionNodeType,
} from "../type";
import type { SelectPropsType } from "../element-type";

export default defineComponent({
  name: "ProFormItem",
  components: { ProInput, ProSelect, ProRadio },
  props: {
    model: {
      type: Object,
      default: () => ({}),
    },
    prop: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array as PropType<OptionNodeType[]>,
    },
    params: {
      type: Object,
    },
    request: {
      type: Function as PropType<RequestOptionsFunctionType>,
    },
    valueType: {
      type: String as PropType<ProValueType>,
    },
    fieldProps: {
      type: Object as PropType<SelectPropsType | ProRadioFieldPropsType>,
    },
    formProps: {
      type: Object as PropType<FormItemPropsType>,
    },
  },
  setup() {
    return {
      getComponentByValueType,
    };
  },
});
</script>
