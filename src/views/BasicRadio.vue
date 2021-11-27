<template>
  <el-card>
    <div style="width: 300px">
      <ProRadio
        v-model="hobby"
        :options="hobbyOptions"
        :editable="editable"
        :format-config="formatConfig"
      />
    </div>
    <el-button v-if="editable" type="success" @click="addHobby"
      >添加爱好</el-button
    >
    <el-button v-if="editable" @click="editHobby">修改爱好</el-button>
  </el-card>
  <el-card>
    <div style="width: 300px">
      <ProRadio
        v-model="address"
        :params="addressParams"
        :request="getAddressOptions"
        :field-props="fieldProps"
        :editable="editable"
        :format-config="formatConfig"
      />
    </div>
    <el-button v-if="editable" type="success" @click="changeAddressParams"
      >修改参数</el-button
    >
  </el-card>
  <el-card>
    <el-button @click="editable = !editable">切换编辑</el-button>
    <el-button @click="changeFormatConfig">切换dot</el-button>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import ProRadio from "@/components/ProField/ProRadio.vue";
import {
  FormatConfigType,
  ProRadioFieldPropsType,
} from "@/components/ProField/type";
export default defineComponent({
  name: "Home",
  components: {
    ProRadio,
  },
  setup() {
    const hobbyOptions = reactive([
      { label: "抽烟", value: "1" },
      { label: "喝酒", value: "2" },
      { label: "烫头", value: "3" },
    ]);
    const hobby = ref("1");
    async function getAddressOptions(params: any) {
      console.log("开始获取addressOptions，参数是：", params);
      await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
      return [
        { label: `广东${params.id}`, value: "guangdong" },
        { label: `福建${params.id}`, value: "fujian" },
        { label: `上海${params.id}`, value: "shanghai" },
      ];
    }
    const address = ref("guangdong");
    const addressParams = reactive({ id: "xxx" });
    const editable = ref(true);
    const fieldProps = reactive<ProRadioFieldPropsType>({
      radioGroupProps: {
        textColor: "red",
      },
      radioProps: {
        border: true,
        type: "radioButton",
      },
    });
    const formatConfig = reactive<FormatConfigType>({
      ellipsis: true,
      dot: {},
    });
    function addHobby() {
      const key = Math.floor(Math.random() * 1000);
      hobbyOptions.push({ label: `新爱好${key}`, value: `${key}` });
    }
    function editHobby() {
      hobbyOptions[0].label = "没事抽啥烟?没事抽啥烟?没事抽啥烟?";
    }
    function changeAddressParams() {
      addressParams.id += "x";
    }
    function changeFormatConfig() {
      formatConfig.dot = formatConfig.dot
        ? undefined
        : { style: { backgroundColor: "orange" } };
    }
    return {
      hobbyOptions,
      hobby,
      addressParams,
      getAddressOptions,
      changeAddressParams,
      changeFormatConfig,
      address,
      fieldProps,
      editable,
      formatConfig,
      addHobby,
      editHobby,
    };
  },
});
</script>
