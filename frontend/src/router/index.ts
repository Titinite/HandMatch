import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const APP_NAME = "HandMatch";

// Page de référence des composants : disponible en développement uniquement.
const devRoutes: RouteRecordRaw[] = import.meta.env.DEV
  ? [
      {
        path: "/design-system",
        name: "design-system",
        component: () => import("@/pages/DesignSystemPage.vue"),
        meta: { title: "Design system" },
      },
    ]
  : [];

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/HomePage.vue"),
      meta: { title: "Accueil" },
    },
    ...devRoutes,
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
  document.title = title ? `${title} · ${APP_NAME}` : APP_NAME;
});

declare module "vue-router" {
  interface RouteMeta {
    /** Titre de la page, utilisé pour `document.title`. */
    title?: string;
  }
}
