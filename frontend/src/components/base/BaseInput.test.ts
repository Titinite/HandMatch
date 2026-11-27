import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import BaseInput from "./BaseInput.vue";

describe("BaseInput", () => {
  it("associe le label au champ", () => {
    const wrapper = mount(BaseInput, { props: { label: "Email", modelValue: "" } });

    const input = wrapper.get("input");
    expect(wrapper.get("label").attributes("for")).toBe(input.attributes("id"));
  });

  it("émet la nouvelle valeur saisie", async () => {
    const wrapper = mount(BaseInput, { props: { label: "Email", modelValue: "" } });

    await wrapper.get("input").setValue("nom@club.fr");

    expect(wrapper.emitted("update:modelValue")).toEqual([["nom@club.fr"]]);
  });

  it("signale l'erreur de façon accessible", () => {
    const wrapper = mount(BaseInput, {
      props: { label: "Email", modelValue: "x", error: "Adresse invalide" },
    });

    const input = wrapper.get("input");
    expect(input.attributes("aria-invalid")).toBe("true");
    expect(wrapper.get("[role='alert']").text()).toBe("Adresse invalide");
    expect(input.attributes("aria-describedby")).toBe(
      wrapper.get("[role='alert']").attributes("id"),
    );
  });
});
