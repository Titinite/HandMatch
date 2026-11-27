<template>
  <div class="layout">
    <a class="layout__skip" href="#contenu">Aller au contenu</a>
    <AppHeader />
    <main id="contenu" class="layout__content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from "@/components/layout/AppFooter.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__content {
  flex: 1;
  padding-block: var(--space-12);
}

.layout__skip {
  position: absolute;
  left: var(--space-4);
  top: -100px;
  z-index: 20;
  padding: var(--space-2) var(--space-4);
  background: var(--color-ink);
  color: var(--color-on-dark);
}

.layout__skip:focus {
  top: var(--space-2);
}
</style>
