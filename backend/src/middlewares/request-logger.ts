import { pinoHttp } from "pino-http";

import { logger } from "../utils/logger.js";

// Journalise uniquement la méthode, le chemin (sans paramètres de requête) et le statut :
// ni en-têtes, ni corps, ni adresse IP, pour ne stocker aucune donnée personnelle.
export const requestLogger = pinoHttp({
  logger,
  autoLogging: { ignore: (req) => req.url === "/api/v1/health" },
  serializers: {
    req: (req: { method?: string; url?: string }) => ({
      method: req.method,
      path: req.url?.split("?")[0],
    }),
    res: (res: { statusCode: number }) => ({ statusCode: res.statusCode }),
  },
});
