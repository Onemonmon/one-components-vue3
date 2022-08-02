import { getRandomKey } from "@components/shared";
import { isEqual } from "lodash-es";
import { watch, reactive } from "vue";
import type { InnerEditableConfigType, ProTablePropsType } from "../ProTable";

const useEditable = (props: ProTablePropsType, sourceData: any) => {
  const innerEditableConfig = reactive<InnerEditableConfigType>({
    editable: false,
    editableKeys: new Set([]),
    defaultCreateRow: {},
    showCreateButton: true,
    onEditableKeysChange: props.editableConfig?.onEditableKeysChange,
    onSave: props.editableConfig?.onSave,
    onValuesChange: props.editableConfig?.onValuesChange,
  });
  watch(
    () => props.editableConfig?.editable,
    (val) => {
      innerEditableConfig.editable = val === true;
    },
    { immediate: true }
  );
  watch(
    () => props.editableConfig?.editableKeys,
    (val) => {
      if (!isEqual(val, Array.from(innerEditableConfig.editableKeys))) {
        innerEditableConfig.editableKeys = new Set(val);
      }
    },
    { immediate: true, deep: true }
  );
  watch(
    () => props.editableConfig?.defaultCreateRow,
    (val) => {
      innerEditableConfig.defaultCreateRow = val || {};
    },
    { immediate: true }
  );
  watch(
    () => innerEditableConfig.editableKeys,
    (val) => {
      if (innerEditableConfig.onEditableKeysChange) {
        innerEditableConfig.onEditableKeysChange(Array.from(val));
      }
    },
    { deep: true }
  );
  const handleAddNewRow = () => {
    const newKey = getRandomKey();
    sourceData.data.push({
      $isNew: true, // 是否是新增行
      $rowKey: newKey, // 新增行id
      ...innerEditableConfig.defaultCreateRow,
    });
    innerEditableConfig.editableKeys.add(newKey);
  };
  return { innerEditableConfig, handleAddNewRow };
};

export default useEditable;
