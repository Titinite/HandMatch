import pg from "pg";

import { config } from "../config/env.js";
import { logger } from "../utils/logger.js";

export const pool = new pg.Pool({
  connectionString: config.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on("error", (error) => {
  logger.error({ err: error }, "Erreur inattendue sur une connexion PostgreSQL inactive");
});
