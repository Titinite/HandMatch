import { createRouter, createWebHistory } from "vue-router";

const APP_NAME = "HandMatch";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/HomePage.vue"),
      meta: { title: "Accueil" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/pages/NotFoundPage.vue"),
      meta: { title: "Page introuvable" },
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

router.afterEach((to) => {
  const title = typeof to.meta.title === "string" ? to.meta.title : null;
  document.title = title ? `${title} Â· ${APP_NAME}` : APP_NAME;
});

declare module "vue-router" {
  interface RouteMeta {
    /** Titre de la page, utilisÃ© pour `document.title`. */
    title?: string;
  }
}