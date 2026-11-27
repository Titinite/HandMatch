import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createApp } from "./app.js";
import { pingDatabase } from "./repositories/health.repository.js";

// Les tests n'ont pas besoin d'une vraie base : on simule uniquement l'accès BDD.
vi.mock("./repositories/health.repository.js", () => ({
  pingDatabase: vi.fn(),
}));

describe("GET /api/v1/health", () => {
  beforeEach(() => {
    vi.mocked(pingDatabase).mockReset();
  });

  it("renvoie 200 quand la base répond", async () => {
    vi.mocked(pingDatabase).mockResolvedValue(undefined);

    const response = await request(createApp()).get("/api/v1/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok", database: "up" });
  });

  it("renvoie 503 quand la base ne répond pas", async () => {
    vi.mocked(pingDatabase).mockRejectedValue(new Error("connexion refusée"));

    const response = await request(createApp()).get("/api/v1/health");

    expect(response.status).toBe(503);
    expect(response.body).toEqual({ status: "degraded", database: "down" });
  });
});

describe("route inexistante", () => {
  it("renvoie une erreur JSON au format standard", async () => {
    const response = await request(createApp()).get("/api/v1/inconnue");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      code: "NOT_FOUND",
      message: "Ressource introuvable",
      details: null,
    });
  });
});
