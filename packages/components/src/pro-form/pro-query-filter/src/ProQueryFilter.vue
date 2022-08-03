<script lang="ts">
export default { name: "ProQueryFilter" };
</script>

<script lang="ts" setup>
import { computed, ref, toRaw, useSlots, watch } from "vue";
import { ElForm, ElFormItem, ElRow, ElCol, ElButton } from "element-plus";
import proQueryFilterProps, { ProFormInstance } from "./ProQueryFilter";
import ProFormItem from "../../pro-form-item/src/ProFormItem.vue";

const props = defineProps(proQueryFilterProps);
const slots = props.slots || useSlots();
const model = ref<any>({ ...props.initialValues });
watch(
  () => props.initialValues,
  (val) => {
    model.value = { ...val };
  }
);
const innerFormRef = ref<ProFormInstance>();
const innerFormProps = computed(() => ({
  labelWidth: 100,
  ...props.formProps,
}));
const submitLoading = ref(false);
const handleReset = () => {
  model.value = { ...props.initialValues };
  props.onReset && props.onReset();
};
const handleSubmit = async () => {
  if (!innerFormRef.value) {
    return;
  }
  try {
    await innerFormRef.value.validate();
    submitLoading.value = true;
    const rawValue = toRaw(model.value);
    await (props.onSubmit && props.onSubmit(rawValue));
  } catch (error) {
    console.log("error message: ", error);
  } finally {
    submitLoading.value = false;
  }
};
</script>

<template>
  <el-form
    class="pro-query-filter-container"
    v-bind="innerFormProps"
    ref="innerFormRef"
    :model="model"
  >
    <el-row :gutter="12">
      <template :key="column.prop" v-for="column in columns">
        <el-col
          :span="column.span || 8"
          v-if="
            typeof column.hideInForm === 'function'
              ? !column.hideInForm(model)
              : column.hideInForm !== true
          "
        >
          <pro-form-item v-bind="column" :model="model" :slots="slots" />
        </el-col>
      </template>
      <el-col :span="8" key="query-footer">
        <el-form-item>
          <el-button @click="handleReset">重置</el-button>
          <el-button
            type="primary"
            :loading="submitLoading"
            @click="handleSubmit"
          >
            查询
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
