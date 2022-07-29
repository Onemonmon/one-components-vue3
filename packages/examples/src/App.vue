<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
pre {
  margin: 0;
}
pre code.hljs {
  padding: 20px !important;
  background-color: #f5f7f5;
  line-height: 1.4;
  color: #303133;
  font-family: "JetBrains Mono", source-code-pro, Menlo, Monaco, Consolas,
    "Courier New", monospace;
}

pre code.hljs .hljs-title,
pre code.hljs .hljs-attr,
pre code.hljs .hljs-function {
  color: #303133;
}
pre code.hljs .hljs-params {
  color: #717c11;
}
</style>
