import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import InputFormView from "../views/InputFormView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Video-Trimmer-App",
    component: InputFormView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
