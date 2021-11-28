<template>
  <el-form
    class="pro-form"
    ref="innerFormRef"
    v-bind="innerFormProps"
    :model="model"
  >
    <slot>
      <template v-for="(column, index) in columns">
        <el-row :key="index" v-if="column.children && column.children.length">
          <el-col
            :span="item.span || column.span || span"
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
    </slot>
    <slot name="footer">
      <el-form-item
        class="pro-form__footer"
        v-if="
          (submitButtonProps !== false || resetButtonProps !== false) &&
          editable
        "
      >
        <el-button
          v-bind="innerSubmitButtonProps"
          @click="handleSubmit"
          v-if="submitButtonProps !== false"
          >{{ innerSubmitButtonProps.text }}</el-button
        >
        <el-button
          v-bind="innerResetButtonProps"
          @click="handleReset"
          v-if="resetButtonProps !== false"
          >{{ innerResetButtonProps.text }}</el-button
        >
      </el-form-item>
    </slot>
  </el-form>
</template>

<script lang="ts">
import {
  computed,
  watch,
  defineComponent,
  PropType,
  ref,
  Ref,
  onMounted,
} from "vue";
import ProFormItem from "./ProFormItem.vue";
import type { FormPropsType, ProFormItemPropsType } from "./type";
import type { ProButtonPropsType } from "../type";

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
    formRef: {
      type: Function as PropType<(formRef: Ref<any>) => void>,
    },
    submitButtonProps: {
      type: [Object, Boolean] as PropType<ProButtonPropsType | false>,
      default: () => ({}),
    },
    resetButtonProps: {
      type: [Object, Boolean] as PropType<ProButtonPropsType | false>,
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
        !props.editable || props.formProps.hideRequiredAsterisk, // 不可编辑时，隐藏标签旁的红色星号
    }));
    const submitButtonLoading = ref<boolean>(false);
    const innerSubmitButtonProps = computed<ProButtonPropsType>(() => ({
      type: "primary",
      size: "small",
      loading: submitButtonLoading.value,
      text: "确认",
      ...props.submitButtonProps,
    }));
    const innerResetButtonProps = computed<ProButtonPropsType>(() => ({
      plain: true,
      size: "small",
      text: "重置",
      ...props.resetButtonProps,
    }));
    // 监听初始值变化，当该变化的字段还没有值时，则为其赋初始值
    watch(
      () => props.initialValues,
      (val) => val && (model.value = { ...model.value, ...val }),
      { deep: true }
    );
    // 表单实例对象
    const innerFormRef = ref();
    onMounted(() => {
      if (props.formRef) {
        props.formRef(innerFormRef.value);
      }
    });
    async function handleSubmit() {
      try {
        await innerFormRef.value.validate();
        submitButtonLoading.value = true;
        if (props.onFinish) {
          await props.onFinish(innerFormRef.value.model);
        }
        submitButtonLoading.value = false;
      } catch (errors) {
        console.log("--validate errors--", errors);
      }
    }
    function handleReset(e: MouseEvent) {
      model.value = { ...props.initialValues };
      setTimeout(() => innerFormRef.value.clearValidate(), 0);
      if (props.onReset) {
        props.onReset(e);
      }
    }
    return {
      model,
      innerFormProps,
      innerSubmitButtonProps,
      innerResetButtonProps,
      innerFormRef,
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
