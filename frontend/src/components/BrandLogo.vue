<template>
  <span class="logo">
    <svg class="logo__mark" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle class="logo__ring" cx="15" cy="15" r="14" stroke-width="2" />
      <path class="logo__arc" d="M15 1 A14 14 0 0 1 15 29" stroke-width="2" fill="none" />
      <circle class="logo__dot" cx="15" cy="15" r="4" />
    </svg>
    <span class="logo__name">HandMatch</span>
  </span>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
}

.logo__mark {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.logo__ring {
  stroke: currentcolor;
}

.logo__arc {
  stroke: var(--color-orange);
}

.logo__dot {
  fill: currentcolor;
}

.logo__name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
