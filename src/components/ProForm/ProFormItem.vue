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
        :formatConfig="formatConfig"
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
import ProDatePicker from "../ProField/ProDatePicker.vue";
import { getComponentByValueType } from "../utils";
import type { FormItemPropsType } from "./type";
import type {
  FormatConfigType,
  ProRadioFieldPropsType,
} from "../ProField/type";
import type {
  ProValueType,
  RequestOptionsFunctionType,
  OptionNodeType,
} from "../type";
import type { DatePickerPropsType, SelectPropsType } from "../element-type";

export default defineComponent({
  name: "ProFormItem",
  components: { ProInput, ProSelect, ProRadio, ProDatePicker },
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
    formatConfig: {
      type: Object as PropType<FormatConfigType>,
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
      type: Object as PropType<
        SelectPropsType | ProRadioFieldPropsType | DatePickerPropsType
      >,
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
