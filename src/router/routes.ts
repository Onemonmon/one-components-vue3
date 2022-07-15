import BasicLayout from "@/layout/BasicLayout.vue";
import DemoLayout from "@/layout/DemoLayout.vue";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: BasicLayout,
    children: [
      {
        path: "/pro-filed",
        name: "表单组件",
        component: DemoLayout,
        children: [
          {
            path: "/pro-field/pro-input",
            name: "ProInput 输入框",
            component: () => import("@/views/pro-filed/pro-input/Index.vue"),
          },
          {
            path: "/pro-field/pro-radio",
            name: "ProRadio 单选",
            component: () => import("@/views/pro-filed/pro-radio/Index.vue"),
          },
          {
            path: "/pro-field/pro-select",
            name: "ProSelect 选择框",
            component: () => import("@/views/pro-filed/pro-select/Index.vue"),
          },
          {
            path: "/pro-field/pro-text",
            name: "ProText 文本",
            component: () => import("@/views/pro-filed/pro-text/Index.vue"),
          },
        ],
      },
    ],
  },
];

export default routes;
