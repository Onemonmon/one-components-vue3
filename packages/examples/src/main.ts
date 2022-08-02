import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { ElLoading } from "element-plus";
import ProComponents from "one-components-vue3";
import "one-components-vue3/dist/style.css";
import "highlight.js/styles/vs2015.css";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";

createApp(App)
  .use(router)
  .use(ElLoading)
  .use(ProComponents)
  .use(hljsVuePlugin)
  .mount("#app");
