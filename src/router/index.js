import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    
    {
      path: "/",
      component: AuthLayout,
      children: [
        {
          path: "/auth",
          name: "auth",
          component: () => import("@/views/AuthView.vue"),
        },
        {
          path: "/register",
          name: "register",
          component: () => import("@/views/RegisterView.vue"),
        },
        {
          path: "/login",
          name: "login",
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
