<template>
  <article class="card">
    <slot />
  </article>
</template>

<style scoped>
.card {
  padding: var(--space-4);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  background: var(--color-surface);
}
</style>
