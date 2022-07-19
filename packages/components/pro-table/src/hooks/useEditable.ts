import { isArray } from "@components/shared/src";
import { watch, reactive } from "vue";
import type {
  EditableKeysType,
  InnerEditableConfigType,
  ProTablePropsType,
} from "../ProTable";

const useEditable = (props: ProTablePropsType) => {
  const innerEditableConfig = reactive<InnerEditableConfigType>({
    editable: false,
    editableKeys: new Set([]),
    onEditableKeysChange() {},
    onSave() {},
    onValuesChange() {},
  });

  watch(
    () => props.editableConfig,
    (val) => {
      if (val) {
        innerEditableConfig.editable = Boolean(val.editable);
        isArray(val.editableKeys) &&
          (innerEditableConfig.editableKeys = new Set([
            val.editableKeys as EditableKeysType,
          ]));
        val.onEditableKeysChange &&
          (innerEditableConfig.onEditableKeysChange = val.onEditableKeysChange);
        val.onSave && (innerEditableConfig.onSave = val.onSave);
        val.onValuesChange &&
          (innerEditableConfig.onValuesChange = val.onValuesChange);
      }
    },
    { immediate: true, deep: true }
  );
  return innerEditableConfig;
};

export default useEditable;
