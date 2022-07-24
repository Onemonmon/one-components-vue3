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
        path: "/basic-components",
        name: "基础组件",
        component: DemoLayout,
        children: [
          {
            path: "/pro-field/pro-input",
            name: "ProInput 输入框",
            component: () => import("@/views/pro-field/pro-input/Index.vue"),
          },
          {
            path: "/pro-field/pro-radio",
            name: "ProRadio 单选",
            component: () => import("@/views/pro-field/pro-radio/Index.vue"),
          },
          {
            path: "/pro-field/pro-checkbox",
            name: "ProCheckbox 复选",
            component: () => import("@/views/pro-field/pro-checkbox/Index.vue"),
          },
          {
            path: "/pro-field/pro-select",
            name: "ProSelect 选择框",
            component: () => import("@/views/pro-field/pro-select/Index.vue"),
          },
          {
            path: "/pro-field/pro-text",
            name: "ProText 文本",
            component: () => import("@/views/pro-field/pro-text/Index.vue"),
          },
        ],
      },
      {
        path: "/pro-components",
        name: "高级组件",
        component: DemoLayout,
        children: [
          {
            path: "/pro-table",
            name: "ProTable 高级表格",
            component: () => import("@/views/pro-table/Index.vue"),
          },
          {
            path: "/pro-query-filter",
            name: "ProQueryFiler 筛选器",
            component: () =>
              import("@/views/pro-form/pro-query-filter/Index.vue"),
          },
        ],
      },
    ],
  },
];

export default routes;
