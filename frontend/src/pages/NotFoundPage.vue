<template>
  <div class="container">
    <p class="not-found__code">Erreur 404</p>
    <h1>Page introuvable</h1>
    <p>La page que tu cherches n'existe pas ou a été déplacée.</p>
    <RouterLink to="/">Retour à l'accueil</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.not-found__code {
  font-family: var(--font-mono);
  font-size: var(--text-mono);
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color-orange-dark);
}
</style>
