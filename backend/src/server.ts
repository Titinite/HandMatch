import { createApp } from "./app.js";
import { config } from "./config/env.js";
import { pool } from "./db/pool.js";
import { logger } from "./utils/logger.js";

const app = createApp();

const server = app.listen(config.PORT, "0.0.0.0", () => {
  logger.info(`Backend démarré sur le port ${config.PORT}`);
});

function shutdown(signal: string): void {
  logger.info(`Signal ${signal} reçu, arrêt en cours`);
  server.close(() => {
    void pool.end().then(() => process.exit(0));
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
