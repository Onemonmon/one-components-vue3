<template>
  <el-form
    class="pro-form"
    ref="formRef"
    v-bind="innerFormProps"
    :model="model"
  >
    <template v-for="(column, index) in columns">
      <el-row :key="index" v-if="column.children && column.children.length">
        <el-col
          :span="item.span || span"
          v-for="item in column.children"
          :key="item.prop"
        >
          <ProFormItem
            :model="model"
            v-bind="{
              ...item,
              editable:
                editable &&
                column.editable !== false &&
                item.editable !== false,
            }"
          />
        </el-col>
      </el-row>
      <el-row :key="column.prop" v-else>
        <el-col :span="column.span || span">
          <ProFormItem
            :model="model"
            v-bind="{
              ...column,
              editable: editable && column.editable !== false,
            }"
          />
        </el-col>
      </el-row>
    </template>
    <el-form-item v-if="innerEditable">
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
import ProFormItem from "./ProFormItem.vue";
import type { FormPropsType, ProFormItemPropsType } from "./type";
import type { ButtonPropsType } from "../element-type";

export default defineComponent({
  name: "ProForm",
  components: { ProFormItem },
  props: {
    initialValues: {
      type: Object,
      default: () => ({}),
    },
    columns: {
      type: Array as PropType<ProFormItemPropsType[]>,
      default: () => [],
    },
    editable: {
      type: Boolean,
      default: true,
    },
    formProps: {
      type: Object as PropType<FormPropsType>,
      default: () => ({}),
    },
    span: {
      type: Number,
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
      labelWidth: "100px",
      scrollToError: true,
      ...props.formProps,
      hideRequiredAsterisk:
        !innerEditable.value || props.formProps.hideRequiredAsterisk, // 不可编辑时，隐藏标签旁的红色星号
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
    // 判断表单是否可编辑
    const innerEditable = computed(() => {
      let isColumnsEditable = false;
      props.columns.forEach((n) => {
        if (n.editable !== false) {
          isColumnsEditable = true;
        }
        if (n.children && n.children.length) {
          n.children.forEach((m) => {
            if (m.editable !== false) {
              isColumnsEditable = true;
            }
          });
        }
      });
      return props.editable && isColumnsEditable;
    });
    // 监听初始值变化，当该变化的字段还没有值时，则为其赋初始值
    watch(
      () => props.initialValues,
      (val) => val && (model.value = { ...model.value, ...val }),
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
      innerEditable,
      formRef,
      handleSubmit,
      handleReset,
    };
  },
});
</script>

<style lang="scss" scoped>
$deep: "::v-deep";
.pro-form {
  .el-form-item {
    #{$deep} {
      .el-form-item__content {
        display: flex;
        align-items: center;
        line-height: unset;
      }
      .pro-date-picker,
      .pro-select {
        width: 100%;
      }
    }
  }
}
</style>
