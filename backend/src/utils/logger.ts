import { pino } from "pino";

import { config } from "../config/env.js";

export const logger = pino({
  level: config.LOG_LEVEL,
  // Sortie lisible en développement, JSON structuré ailleurs.
  ...(config.NODE_ENV === "development" ? { transport: { target: "pino-pretty" } } : {}),
});
