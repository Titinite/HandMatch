<template>
  <div class="container ds">
    <header>
      <p class="ds__kicker">Design system</p>
      <h1>Charte HandMatch</h1>
      <p class="ds__lead">
        Tokens et composants de base, issus de la charte graphique v1.0. Page visible en
        développement uniquement.
      </p>
    </header>

    <section aria-labelledby="ds-colors">
      <h2 id="ds-colors">Couleurs</h2>
      <div v-for="group in colorGroups" :key="group.title" class="ds__group">
        <h3>{{ group.title }}</h3>
        <p v-if="group.note" class="ds__note">{{ group.note }}</p>
        <ul class="ds__swatches">
          <li v-for="color in group.colors" :key="color.token" class="ds__swatch">
            <span class="ds__chip" :style="{ background: `var(${color.token})` }" />
            <span class="ds__swatch-name">{{ color.label }}</span>
            <code class="ds__swatch-token">{{ color.token }}</code>
          </li>
        </ul>
      </div>
    </section>

    <section aria-labelledby="ds-type">
      <h2 id="ds-type">Typographie</h2>
      <p class="ds__sample ds__sample--display">Anton — titres, boutons, chiffres clés</p>
      <p class="ds__sample ds__sample--body">
        Inter — paragraphes, formulaires, navigation, contenu des cartes.
      </p>
      <p class="ds__sample ds__sample--mono">Space Mono — kickers, badges, dates, données</p>
      <h1>Titre H1</h1>
      <h2>Titre H2</h2>
      <h3>Titre H3</h3>
    </section>

    <section aria-labelledby="ds-buttons">
      <h2 id="ds-buttons">Boutons</h2>
      <div class="ds__row">
        <BaseButton>Principal</BaseButton>
        <BaseButton variant="outline">Contour</BaseButton>
        <BaseButton variant="ghost">Discret</BaseButton>
        <BaseButton disabled>Désactivé</BaseButton>
      </div>
    </section>

    <section aria-labelledby="ds-fields">
      <h2 id="ds-fields">Champs de formulaire</h2>
      <div class="ds__stack">
        <BaseInput v-model="email" label="Adresse email" type="email" placeholder="nom@club.fr" />
        <BaseInput v-model="invalid" label="Champ en erreur" error="Cette valeur est invalide." />
      </div>
    </section>

    <section aria-labelledby="ds-cards">
      <h2 id="ds-cards">Cartes et badges</h2>
      <BaseCard>
        <div class="ds__card-row">
          <div>
            <h3 class="ds__card-title">Club de handball de Bordeaux</h3>
            <p class="ds__note">Recherche un gardien pour la saison 2026/2027</p>
          </div>
          <BaseBadge tone="pending">En attente</BaseBadge>
        </div>
      </BaseCard>
      <div class="ds__row">
        <BaseBadge>Neutre</BaseBadge>
        <BaseBadge tone="pending">En attente</BaseBadge>
        <BaseBadge tone="accepted">Accepté</BaseBadge>
        <BaseBadge tone="refused">Refusé</BaseBadge>
      </div>
    </section>

    <section aria-labelledby="ds-scale">
      <h2 id="ds-scale">Espacements et rayons</h2>
      <ul class="ds__scale">
        <li v-for="space in spacings" :key="space.token" class="ds__scale-row">
          <span class="ds__scale-bar" :style="{ width: `var(${space.token})` }" />
          <code>{{ space.token }} · {{ space.value }}</code>
        </li>
      </ul>
      <div class="ds__row">
        <span class="ds__radius" style="border-radius: var(--radius-button)">3px</span>
        <span class="ds__radius" style="border-radius: var(--radius-input)">5px</span>
        <span class="ds__radius" style="border-radius: var(--radius-card)">8px</span>
        <span class="ds__radius" style="border-radius: var(--radius-pill)">100px</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import BaseBadge from "@/components/base/BaseBadge.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseInput from "@/components/base/BaseInput.vue";

interface ColorToken {
  label: string;
  token: string;
}

interface ColorGroup {
  title: string;
  note?: string;
  colors: ColorToken[];
}

const colorGroups: ColorGroup[] = [
  {
    title: "Marque",
    colors: [
      { label: "Marine (texte, fonds sombres)", token: "--color-ink" },
      { label: "Marine adoucie", token: "--color-ink-soft" },
      { label: "Papier (fond)", token: "--color-paper" },
      { label: "Panneau", token: "--color-panel" },
      { label: "Trait", token: "--color-line" },
      { label: "Orange (action)", token: "--color-orange" },
      { label: "Orange foncé", token: "--color-orange-dark" },
      { label: "Lime", token: "--color-lime" },
      { label: "Lime foncé", token: "--color-lime-dark" },
    ],
  },
  {
    title: "Statuts",
    colors: [
      { label: "Succès", token: "--color-ok" },
      { label: "Succès (fond)", token: "--color-ok-bg" },
      { label: "Attention", token: "--color-warn" },
      { label: "Attention (fond)", token: "--color-warn-bg" },
      { label: "Refus", token: "--color-refuse" },
      { label: "Refus (fond)", token: "--color-refuse-bg" },
    ],
  },
  {
    title: "Protection des mineurs",
    note: "Réservé exclusivement aux signaux liés aux mineurs. Ne jamais utiliser ailleurs.",
    colors: [
      { label: "Violet de protection", token: "--color-minor" },
      { label: "Fond de protection", token: "--color-minor-bg" },
    ],
  },
];

const spacings = [
  { token: "--space-1", value: "4px" },
  { token: "--space-2", value: "8px" },
  { token: "--space-4", value: "16px" },
  { token: "--space-6", value: "24px" },
  { token: "--space-12", value: "48px" },
];

const email = ref("");
const invalid = ref("valeur incorrecte");
</script>

<style scoped>
.ds section {
  padding-block: var(--space-8);
  border-top: 1px solid var(--color-line);
}

.ds__kicker {
  font-family: var(--font-mono);
  font-size: var(--text-mono);
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color-orange-dark);
}

.ds__lead,
.ds__note {
  color: var(--color-ink-soft);
}

.ds__group {
  margin-bottom: var(--space-6);
}

.ds__swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.ds__swatch {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.ds__chip {
  height: 64px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
}

.ds__swatch-name {
  font-size: var(--text-small);
  font-weight: 600;
}

.ds__swatch-token {
  font-family: var(--font-mono);
  font-size: var(--text-mono);
  color: var(--color-ink-soft);
}

.ds__sample--display {
  font-family: var(--font-display);
  font-size: var(--text-h3);
  text-transform: uppercase;
}

.ds__sample--mono {
  font-family: var(--font-mono);
}

.ds__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-block: var(--space-4);
}

.ds__stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 360px;
}

.ds__card-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.ds__card-title {
  margin: 0 0 var(--space-1);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
}

.ds__scale {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ds__scale-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-2);
}

.ds__scale-bar {
  height: 12px;
  background: var(--color-orange);
}

.ds__radius {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 1px solid var(--color-line);
  background: var(--color-panel);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
}
</style>
