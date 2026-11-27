import { defineStore } from "pinia";
import { ref } from "vue";

export const useUiStore = defineStore("ui", () => {
  const isMobileNavOpen = ref(false);

  function toggleMobileNav(): void {
    isMobileNavOpen.value = !isMobileNavOpen.value;
  }

  function closeMobileNav(): void {
    isMobileNavOpen.value = false;
  }

  return { isMobileNavOpen, toggleMobileNav, closeMobileNav };
});
