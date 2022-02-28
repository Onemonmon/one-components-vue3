import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import ProComponents from "../packages";

createApp(App).use(router).use(ElementPlus).use(ProComponents).mount("#app");
