<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink to="/" class="header__brand" aria-label="HandMatch, retour à l'accueil">
        <BrandLogo />
      </RouterLink>

      <button
        class="header__toggle"
        type="button"
        aria-controls="main-nav"
        :aria-expanded="isMobileNavOpen"
        @click="ui.toggleMobileNav()"
      >
        <span class="visually-hidden">Menu</span>
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" fill="none" />
        </svg>
      </button>

      <nav
        id="main-nav"
        class="header__nav"
        :class="{ 'is-open': isMobileNavOpen }"
        aria-label="Navigation principale"
      >
        <ul class="header__list">
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to" class="header__link">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

import BrandLogo from "@/components/BrandLogo.vue";
import { useUiStore } from "@/stores/ui";

const route = useRoute();
const ui = useUiStore();
const { isMobileNavOpen } = storeToRefs(ui);

const links = [
  { to: "/", label: "Accueil" },
  ...(import.meta.env.DEV ? [{ to: "/design-system", label: "Design system" }] : []),
];

watch(
  () => route.fullPath,
  () => {
    ui.closeMobileNav();
  },
);
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--color-paper);
  border-bottom: 1px solid var(--color-line);
}

.header__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-block: var(--space-3);
}

.header__brand {
  text-decoration: none;
}

.header__toggle {
  display: inline-flex;
  padding: var(--space-2);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-input);
  background: transparent;
  color: var(--color-ink);
  cursor: pointer;
}

.header__nav {
  display: none;
  width: 100%;
  padding-top: var(--space-3);
}

.header__nav.is-open {
  display: block;
}

.header__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.header__link {
  font-family: var(--font-mono);
  font-size: var(--text-mono);
  font-weight: 700;
  letter-spacing: 0.3px;
  text-decoration: none;
  text-transform: uppercase;
  color: var(--color-ink-soft);
}

.header__link:hover,
.header__link.router-link-exact-active {
  color: var(--color-orange-dark);
}

@media (min-width: 861px) {
  .header__toggle {
    display: none;
  }

  .header__nav {
    display: block;
    width: auto;
    padding-top: 0;
  }

  .header__list {
    flex-direction: row;
    gap: var(--space-6);
  }
}
</style>
