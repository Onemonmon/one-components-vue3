<template>
  <el-form ref="formRef" v-bind="innerFormProps" :model="model">
    <el-form-item
      v-bind="columnProps"
      v-for="{
        valueType,
        request,
        params,
        options,
        fieldProps,
        ...columnProps
      } in columns"
      :key="columnProps.prop"
    >
      <component
        v-model="model[columnProps.prop]"
        :request="request"
        :params="params"
        :options="options"
        :fieldProps="fieldProps"
        :is="getComponentByValueType(valueType)"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        v-bind="innerSubmitButtonProps"
        @click="handleSubmit"
        v-if="submitButtonProps !== false"
        >提交</el-button
      >
      <el-button
        v-bind="innerResetButtonProps"
        @click="handleReset"
        v-if="resetButtonProps !== false"
        >重置</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, watch, defineComponent, PropType, ref } from "vue";
import ProInput from "../ProField/ProInput.vue";
import ProSelect from "../ProField/ProSelect.vue";
import ProRadio from "../ProField/ProRadio.vue";
import { getComponentByValueType } from "../utils";
import type { FormPropsType, ProFormItemPropsType } from "./type";
import type { ButtonPropsType } from "../element-type";

export default defineComponent({
  name: "ProForm",
  components: { ProInput, ProSelect, ProRadio },
  props: {
    initialValues: {
      type: Object,
      default: () => ({}),
    },
    columns: {
      type: Array as PropType<ProFormItemPropsType[]>,
    },
    formProps: {
      type: Object as PropType<FormPropsType>,
    },
    submitButtonProps: {
      type: [Object, Boolean] as PropType<ButtonPropsType | false>,
      default: () => ({}),
    },
    resetButtonProps: {
      type: [Object, Boolean] as PropType<ButtonPropsType | false>,
      default: () => ({}),
    },
    onFinish: {
      type: Function as PropType<(values: any) => Promise<void>>,
    },
    onReset: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup(props) {
    const model = ref({ ...props.initialValues });
    const innerFormProps = computed<FormPropsType>(() => ({
      labelWidth: "30%",
      scrollToError: true,
      ...props.formProps,
    }));
    const submitButtonLoading = ref<boolean>(false);
    const innerSubmitButtonProps = computed<ButtonPropsType>(() => ({
      type: "primary",
      size: "small",
      loading: submitButtonLoading.value,
      ...props.submitButtonProps,
    }));
    const innerResetButtonProps = computed<ButtonPropsType>(() => ({
      plain: true,
      size: "small",
      ...props.submitButtonProps,
    }));
    // 监听初始值变化，当该变化的字段还没有值时，则为其赋初始值
    watch(
      () => props.initialValues,
      (val) => val && (model.value = { ...val }),
      { deep: true }
    );
    // 表单实例对象
    const formRef = ref();
    async function handleSubmit() {
      try {
        await formRef.value.validate();
        submitButtonLoading.value = true;
        if (props.onFinish) {
          await props.onFinish(formRef.value.model);
        }
        submitButtonLoading.value = false;
      } catch (errors) {
        console.log("--validate errors--", errors);
      }
    }
    function handleReset(e: MouseEvent) {
      model.value = { ...props.initialValues };
      setTimeout(() => formRef.value.clearValidate(), 0);
      if (props.onReset) {
        props.onReset(e);
      }
    }
    return {
      model,
      innerFormProps,
      innerSubmitButtonProps,
      innerResetButtonProps,
      formRef,
      getComponentByValueType,
      handleSubmit,
      handleReset,
    };
  },
});
</script>

<style lang="less" scoped></style>
