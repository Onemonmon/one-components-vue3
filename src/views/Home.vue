<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <div :style="{ width: '200px' }">
      <ProSelect
        v-model="hobby"
        :options="hobbys"
        :field-props="fieldProps"
        :editable="editable"
        :format-config="formatConfig"
      />
      <ProInput
        v-model="hobbyName"
        :editable="editable"
        :format-config="formatConfig"
      />
    </div>
    <h3>姓名：{{ info.name }}{{ info.a.b }}{{ hobbys }}</h3>
    <el-button @click="addHobby">添加爱好</el-button>
    <el-button @click="editHobby">修改爱好</el-button>
    <el-button @click="editable = !editable">切换编辑</el-button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  shallowReactive,
  shallowRef,
  ref,
} from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import ProSelect from "@/components/ProField/ProSelect.vue";
import ProInput from "@/components/ProField/ProInput.vue";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    ProSelect,
    ProInput,
  },
  setup() {
    const hobbys = shallowReactive([
      { label: "抽烟", value: "1" },
      { label: "喝酒", value: "2" },
      { label: "烫头", value: "3" },
    ]);
    const hobby = ref(["1"]);
    const editable = ref(true);
    const hobbyName = ref("抽烟");
    const fieldProps = reactive({
      multiple: true,
      collapseTags: true,
    });
    const formatConfig = reactive<any>({
      ellipsis: true,
    });
    const info = shallowRef({ name: "张三", a: { b: 1 } });
    function addHobby() {
      hobbys.push({ label: "吹泡泡啦啦啦啦啦啦啦哈哈哈哈哈哈哈", value: "4" });
    }
    function editHobby() {
      // hobbys[1].label = "不喝酒";
      // fieldProps.collapseTags = false;
      formatConfig.color = "orange";
      formatConfig.dot = formatConfig.dot
        ? undefined
        : {
            style: {
              // backgroundColor: "lightblue",
            },
          };
    }
    return {
      hobbys,
      hobby,
      hobbyName,
      info,
      fieldProps,
      editable,
      formatConfig,
      addHobby,
      editHobby,
    };
  },
});
</script>
