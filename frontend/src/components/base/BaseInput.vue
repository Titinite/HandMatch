<template>
  <div class="field">
    <label class="field__label" :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      class="field__input"
      :class="{ 'field__input--error': error }"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="error ? errorId : undefined"
    />
    <p v-if="error" :id="errorId" class="field__error" role="alert">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from "vue";

withDefaults(
  defineProps<{
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
  }>(),
  { type: "text", placeholder: undefined, required: false, error: undefined },
);

const model = defineModel<string>({ required: true });
const id = useId();
const errorId = computed(() => `${id}-error`);
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.field__label {
  font-size: var(--text-small);
  font-weight: 600;
}

.field__input {
  padding: 10px var(--space-3);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-input);
  background: var(--color-surface);
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: 0.875rem;
}

.field__input--error {
  border-color: var(--color-refuse);
}

.field__error {
  margin: 0;
  font-size: var(--text-small);
  color: var(--color-refuse);
}
</style>
