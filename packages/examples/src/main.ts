import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import ProComponents from "one-components-vue3";
import "highlight.js/styles/vs2015.css";
// import "highlight.js/styles/atom-one-dark.css";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(ProComponents)
  .use(hljsVuePlugin)
  .mount("#app");
