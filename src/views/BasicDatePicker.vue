<template>
  <el-card>
    <ProDatePicker
      v-model="date"
      :editable="editable"
      :fieldProps="fieldProps"
      :format-config="formatConfig"
    />
  </el-card>
  <el-card>
    <el-button @click="editable = !editable">切换编辑</el-button>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import ProDatePicker from "@/components/ProField/ProDatePicker.vue";
import type { FormatConfigType } from "@/components/ProField/type";
import type { DatePickerPropsType } from "@/components/element-type";

export default defineComponent({
  name: "Home",
  components: {
    ProDatePicker,
  },
  setup() {
    const date = ref();
    const editable = ref(true);
    const fieldProps = reactive<DatePickerPropsType>({
      type: "time",
      isRange: true,
      shortcuts: [
        {
          text: "今天",
          value: new Date(),
        },
      ],
      disabledHours() {
        return [11, 20];
      },
      disabledMinutes() {
        return [10, 11, 12, 30];
      },
      disabledDate(date) {
        const time = new Date(date).getTime();
        const nowTime = new Date().getTime();
        return time >= nowTime;
      },
    });
    const formatConfig = reactive<FormatConfigType>({
      ellipsis: true,
    });
    return {
      date,
      fieldProps,
      editable,
      formatConfig,
    };
  },
});
</script>
