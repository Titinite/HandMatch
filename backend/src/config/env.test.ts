import { describe, expect, it } from "vitest";

import { parseConfig } from "./env.js";

const validEnv = { DATABASE_URL: "postgres://user:secret@db:5432/handmatch" };

describe("parseConfig", () => {
  it("applique les valeurs par défaut", () => {
    expect(parseConfig(validEnv)).toMatchObject({
      NODE_ENV: "development",
      PORT: 3000,
      LOG_LEVEL: "info",
    });
  });

  it("convertit le port en nombre", () => {
    expect(parseConfig({ ...validEnv, PORT: "8080" }).PORT).toBe(8080);
  });

  it("refuse une configuration sans DATABASE_URL", () => {
    expect(() => parseConfig({})).toThrow("DATABASE_URL");
  });

  it("refuse un NODE_ENV inconnu", () => {
    expect(() => parseConfig({ ...validEnv, NODE_ENV: "staging" })).toThrow("NODE_ENV");
  });

  it("accepte la valeur d'exemple en développement", () => {
    const env = { DATABASE_URL: "postgres://handmatch:change-me@db:5432/handmatch" };

    expect(() => parseConfig(env)).not.toThrow();
  });

  it("refuse la valeur d'exemple en production", () => {
    const env = {
      NODE_ENV: "production",
      DATABASE_URL: "postgres://handmatch:change-me@db:5432/handmatch",
    };

    expect(() => parseConfig(env)).toThrow("change-me");
  });
});
