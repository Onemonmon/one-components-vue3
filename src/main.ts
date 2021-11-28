import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "pro-components-vue3/lib/pro-components-vue3.css";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import zhCn from "element-plus/es/locale/lang/zh-cn";

createApp(App)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(store)
  .use(router)
  .mount("#app");
