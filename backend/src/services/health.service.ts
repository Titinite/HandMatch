import { pingDatabase } from "../repositories/health.repository.js";
import { logger } from "../utils/logger.js";

export interface HealthStatus {
  status: "ok" | "degraded";
  database: "up" | "down";
}

export async function getHealth(): Promise<HealthStatus> {
  try {
    await pingDatabase();
    return { status: "ok", database: "up" };
  } catch (error) {
    logger.warn({ err: error }, "La base de données ne répond pas");
    return { status: "degraded", database: "down" };
  }
}
