<script lang="ts" setup>
import {
  computed,
  inject,
  onMounted,
  PropType,
  Ref,
  ref,
  toRaw,
  watch,
} from "vue";
import {
  getValueByComplexKey,
  Data,
  getComponentByType,
  ValueType,
  propsHasOptions,
  setValueByComplexKey,
  FormatConfigType,
  getRandomKey,
} from "@components/shared/src";
import { CopyDocument, Check } from "@element-plus/icons-vue";
import { ElMessage, FormItemRule } from "element-plus";
import isEqual from "lodash/isEqual";
import ClipboardJS from "clipboard";
import Schema from "async-validator";
import type { ProFieldPropsType } from "@components/components/pro-field";
import type { InnerEditableConfigType } from "./ProTable";

const props = defineProps({
  /**
   * 当前行数据
   */
  row: {
    type: Object as PropType<Data>,
    defalut: () => ({}),
    required: true,
  },
  /**
   * 当前列字段
   */
  prop: {
    type: String,
    required: true,
  },
  /**
   * 当前表头列的单元格渲染的组件类型
   */
  valueType: {
    type: String as PropType<ValueType>,
    default: "text",
  },
  /**
   * valueType对应的组件的原生入参
   */
  fieldProps: {
    type: Object as PropType<ProFieldPropsType>,
  },
  /**
   * 表格内容是否可复制粘贴
   */
  copyable: {
    type: Boolean,
  },
  /**
   * 当前表头列数据是否可编辑
   */
  editable: {
    type: Boolean,
  },
  /**
   * 只读态的配置
   */
  formatConfig: {
    type: Object as PropType<FormatConfigType>,
    default: () => ({}),
  },
  ...propsHasOptions,
});

const editableConfig = inject("editableConfig", {} as InnerEditableConfigType);
const validatorRules = inject(
  "validatorRules",
  {} as Ref<Record<string, FormItemRule[]>>
);

// 校验状态
const isError = ref(false);

// 复制粘贴
const id = props.prop.replaceAll(".", "-") + getRandomKey();
const isCopyed = ref(false);
let copyTimer: any;
onMounted(() => {
  if (props.copyable) {
    const clipboard = new ClipboardJS(`#copy-icon-${id}`);
    clipboard.on("success", (e) => {
      e.clearSelection();
      ElMessage({ message: "复制成功", type: "success" });
      isCopyed.value = true;
      copyTimer && clearTimeout(copyTimer);
      copyTimer = setTimeout(() => (isCopyed.value = false), 4000);
    });
  }
});

const innerEditable = computed(
  () => props.editable && editableConfig.editableKeys.has(props.row.$rowKey)
);
watch(innerEditable, (val) => !val && (isError.value = false));

const ComponentName = getComponentByType(props.valueType);
const rowProxy = new Proxy(props.row, {
  get(target, key) {
    if (key === "__v_isRef") {
      return target.__v_isRef;
    }
    return getValueByComplexKey(target, key as string);
  },
  set(target, key, value) {
    const oldValue = getValueByComplexKey(target, key as string);
    if (!isEqual(oldValue, value)) {
      setValueByComplexKey(target, key as string, value);
      editableConfig.onValuesChange(target, key as string, value);
    }
    return true;
  },
});

// 校验表单值
const handleValidate = (trigger: string, value: any) => {
  const { prop } = props;
  // blur会触发所有校验，change不会触发blur校验
  let curValidatorRules = validatorRules.value[props.prop];
  if (trigger === "change") {
    curValidatorRules = curValidatorRules.filter((n) => n.trigger !== "blur");
  }
  let _isError = false;
  if (curValidatorRules.length) {
    const validator = new Schema({ [prop]: curValidatorRules });
    validator.validate(
      { [prop]: toRaw(value) },
      (error) => (_isError = error !== null)
    );
  }
  isError.value !== _isError && (isError.value = _isError);
};
</script>

<template>
  <component
    v-model="rowProxy[prop]"
    :class="{ is_Error: isError }"
    :id="`${id}`"
    :fieldProps="fieldProps"
    :editable="innerEditable"
    :formatConfig="formatConfig"
    :options="options"
    :params="params"
    :request="request"
    :onValidate="handleValidate"
    :is="ComponentName"
  />
  <template v-if="!innerEditable && copyable">
    <el-icon
      :id="`copy-icon-${id}`"
      :data-clipboard-target="`#${id}`"
      class="column-copy-icon"
      v-if="!isCopyed"
    >
      <CopyDocument />
    </el-icon>
    <el-icon class="column-copy-success-icon" v-else>
      <Check />
    </el-icon>
  </template>
</template>

<style lang="scss" scoped>
.column-copy-icon,
.column-copy-success-icon {
  margin-left: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: -2px;
}
.column-copy-icon {
  color: var(--el-color-primary);

  &:hover {
    color: var(--el-color-primary-light-3);
  }
}
.column-copy-success-icon {
  color: var(--el-color-success);
}
.is_Error {
  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--el-color-danger) inset;
  }
  :deep(.el-checkbox__inner) {
    border-color: var(--el-color-danger);
  }
}
</style>
