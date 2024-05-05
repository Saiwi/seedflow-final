import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
// import DefaultLayout from "@/layouts/DefaultLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          component: () => import("@/views/MainPage.vue"),
        },
      ],
    },
    {
      path: "/auth",
      component: AuthLayout,
      children: [
        {
          path: "",
          component: () => import("@/views/AuthView.vue"),
        },
        {
          path: "register",
          component: () => import("@/views/RegisterView.vue"),
        },
        {
          path: "login",
          component: () => import("@/views/LoginView.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)",
      name: "not-found",
      component: AuthLayout,
      children: [
        {
          path: "",
          component: () => import("@/views/NotFound.vue"),
        },
      ],
    },
  ],
});

export default router;
