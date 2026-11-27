<template>
  <button class="btn" :class="`btn--${variant}`" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "primary" | "outline" | "ghost";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  { variant: "primary", type: "button", disabled: false },
);
</script>

<style scoped>
.btn {
  display: inline-block;
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-button);
  font-family: var(--font-display);
  font-size: var(--text-mono);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--primary {
  background: var(--color-orange);
  color: var(--color-on-orange);
}

.btn--primary:hover:not(:disabled) {
  background: var(--color-orange-dark);
  color: var(--color-on-dark);
}

.btn--outline {
  border: 2px solid var(--color-ink);
  background: transparent;
  color: var(--color-ink);
}

.btn--outline:hover:not(:disabled) {
  background: var(--color-ink);
  color: var(--color-on-dark);
}

.btn--ghost {
  border: 1px solid var(--color-line);
  background: transparent;
  color: var(--color-ink);
}

.btn--ghost:hover:not(:disabled) {
  background: var(--color-panel);
}
</style>
