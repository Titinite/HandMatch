import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import BaseButton from "./BaseButton.vue";

describe("BaseButton", () => {
  it("affiche son contenu avec la variante principale par défaut", () => {
    const wrapper = mount(BaseButton, { slots: { default: "Envoyer" } });

    expect(wrapper.text()).toBe("Envoyer");
    expect(wrapper.classes()).toContain("btn--primary");
    expect(wrapper.attributes("type")).toBe("button");
  });

  it("applique la variante demandée", () => {
    const wrapper = mount(BaseButton, { props: { variant: "outline" } });

    expect(wrapper.classes()).toContain("btn--outline");
  });

  it("est désactivé quand la propriété disabled est vraie", () => {
    const wrapper = mount(BaseButton, { props: { disabled: true } });

    expect(wrapper.attributes("disabled")).toBeDefined();
  });
});
