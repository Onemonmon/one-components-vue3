<template>
  <div @click="visible = true">
    <slot name="trigger"></slot>
  </div>
  <el-dialog
    custom-class="pro-modal"
    v-model="visible"
    :model-value="visible"
    v-bind="modalProps"
  >
    <ProForm v-bind="innerFormProps">
      <slot></slot>
    </ProForm>
    <template #title><slot name="title"></slot></template>
    <template #footer>
      <slot name="footer">
        <el-button @click="visible = false" v-bind="innerCancelButtonProps">
          取消
        </el-button>
        <el-button @click="handleSubmit" v-bind="innerSubmitButtonProps">
          {{ innerSubmitButtonProps.text }}
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from "vue";
import { useModelValue } from "../ProField/hooks";
import ProForm from "./ProForm.vue";
import type { ModalPropsType } from "../element-type";
import type { ProFormPropsType } from "./type";
import type { ProButtonPropsType } from "../type";

export default defineComponent({
  components: { ProForm },
  props: {
    modelValue: {
      type: Boolean,
    },
    modalProps: {
      type: Object as PropType<ModalPropsType>,
      default: () => ({}),
    },
    formProps: {
      type: Object as PropType<ProFormPropsType>,
      default: () => ({}),
    },
    onFinish: {
      type: Function as PropType<(values: any) => Promise<void>>,
    },
    submitButtonProps: {
      type: [Object, Boolean] as PropType<ProButtonPropsType | false>,
      default: () => ({}),
    },
    cancelButtonProps: {
      type: [Object, Boolean] as PropType<ProButtonPropsType | false>,
      default: () => ({}),
    },
    onVisibleChange: {
      type: Function as PropType<(visible: boolean) => void>,
    },
  },
  setup(props, context) {
    const visible = useModelValue<boolean>(props, context);
    const innerFormProps = computed<ProFormPropsType>(() => ({
      ...props.formProps,
      formRef: (ref) => {
        innerFormRef.value = ref;
        props.formProps.formRef && props.formProps.formRef(ref);
      },
      submitButtonProps: false,
      resetButtonProps: false,
    }));
    const submitButtonLoading = ref<boolean>(false);
    const innerSubmitButtonProps = computed<ProButtonPropsType>(() => ({
      type: "primary",
      size: "small",
      loading: submitButtonLoading.value,
      text: "确认",
      ...props.submitButtonProps,
    }));
    const innerCancelButtonProps = computed<ProButtonPropsType>(() => ({
      size: "small",
      text: "取消",
      ...props.cancelButtonProps,
    }));
    // 表单实例对象
    const innerFormRef = ref();
    async function handleSubmit() {
      try {
        await innerFormRef.value.validate();
        submitButtonLoading.value = true;
        if (props.onFinish) {
          await props.onFinish(innerFormRef.value.model);
        }
        submitButtonLoading.value = false;
        visible.value = false;
      } catch (errors) {
        console.log("--validate errors--", errors);
      }
    }
    watch(visible, (val) => {
      props.onVisibleChange && props.onVisibleChange(val);
    });
    return {
      visible,
      innerFormRef,
      innerFormProps,
      innerSubmitButtonProps,
      innerCancelButtonProps,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
$deep: "::v-deep";
.pro-modal {
  #{$deep} {
    .pro-form__footer {
      margin-bottom: 0;
      .el-form-item__content {
        justify-content: flex-end;
      }
    }
  }
}
</style>
<style lang="scss">
.pro-modal {
  .el-dialog__header {
    border-bottom: 1px solid #f0f0f0;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .el-dialog__footer {
    padding-bottom: 10px;
    border-top: 1px solid #f0f0f0;
  }
}
</style>
