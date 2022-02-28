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
        name: "原子表单组件",
        component: DemoLayout,
        children: [
          {
            path: "/pro-field/pro-input",
            name: "ProInput 示例",
            component: () => import("@/views/pro-filed/ProInputDemo.vue"),
          },
          {
            path: "/pro-field/pro-select",
            name: "ProSelect 示例",
            component: () => import("@/views/pro-filed/ProSelectDemo.vue"),
          },
        ],
      },
    ],
  },
];

export default routes;
