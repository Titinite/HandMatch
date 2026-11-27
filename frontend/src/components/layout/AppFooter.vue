<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__text">HandMatch · Bêta ouverte à Bordeaux</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-navy);
  color: var(--color-on-dark-soft);
}

.footer__inner {
  padding-block: var(--space-6);
}

.footer__text {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-mono);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
</style>
