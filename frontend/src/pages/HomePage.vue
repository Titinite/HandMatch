<template>
  <div class="container">
    <p class="home__kicker">Bêta ouverte · Bordeaux</p>
    <h1>Le terrain où on se rencontre</h1>
    <p class="home__lead">
      HandMatch centralise les profils et les offres de recrutement du handball amateur.
    </p>
    <p v-if="showApiStatus" class="home__status" :class="`home__status--${apiState}`">
      {{ apiLabels[apiState] }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { api } from "@/services/api";

type ApiState = "checking" | "up" | "down";

const showApiStatus = import.meta.env.DEV;
const apiState = ref<ApiState>("checking");

const apiLabels: Record<ApiState, string> = {
  checking: "API : vérification…",
  up: "API : opérationnelle",
  down: "API : indisponible",
};

onMounted(async () => {
  if (!showApiStatus) {
    return;
  }
  try {
    await api.get("/health");
    apiState.value = "up";
  } catch {
    apiState.value = "down";
  }
});
</script>

<style scoped>
.home__kicker {
  font-family: var(--font-mono);
  font-size: var(--text-mono);
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color-orange-dark);
}

.home__lead {
  max-width: 560px;
  color: var(--color-ink-soft);
}

.home__status {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
  font-size: var(--text-small);
  font-weight: 600;
  background: var(--color-warn-bg);
  color: var(--color-warn);
}

.home__status--up {
  background: var(--color-ok-bg);
  color: var(--color-ok);
}

.home__status--down {
  background: var(--color-refuse-bg);
  color: var(--color-refuse);
}
</style>
