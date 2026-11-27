<template>
  <span class="badge" :class="`badge--${tone}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: "neutral" | "pending" | "accepted" | "refused";
  }>(),
  { tone: "neutral" },
);
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
  font-size: var(--text-small);
  font-weight: 600;
}

.badge--neutral {
  background: var(--color-panel);
  color: var(--color-ink-soft);
}

.badge--pending {
  background: var(--color-warn-bg);
  color: var(--color-warn);
}

.badge--accepted {
  background: var(--color-ok-bg);
  color: var(--color-ok);
}

.badge--refused {
  background: var(--color-refuse-bg);
  color: var(--color-refuse);
}
</style>
