import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/basic-select",
    name: "basic-select",
    component: () => import("../views/BasicSelect.vue"),
  },
  {
    path: "/basic-radio",
    name: "basic-radio",
    component: () => import("../views/BasicRadio.vue"),
  },
  {
    path: "/basic-date-picker",
    name: "basic-date-picker",
    component: () => import("../views/BasicDatePicker.vue"),
  },
  {
    path: "/basic-form",
    name: "basic-form",
    component: () => import("../views/BasicForm.vue"),
  },
  {
    path: "/basic-modal-form",
    name: "basic-modal-form",
    component: () => import("../views/BasicModalForm.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
