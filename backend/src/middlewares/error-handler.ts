import type { ErrorRequestHandler, RequestHandler } from "express";

import { AppError } from "../utils/app-error.js";
import { logger } from "../utils/logger.js";

function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }
  // Corps JSON invalide, levé par express.json().
  if (error instanceof SyntaxError && "body" in error) {
    return new AppError(400, "INVALID_JSON", "Le corps de la requête n'est pas un JSON valide");
  }
  return new AppError(500, "INTERNAL_ERROR", "Une erreur interne est survenue");
}

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new AppError(404, "NOT_FOUND", "Ressource introuvable"));
};

export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, _next) => {
  const appError = toAppError(error);

  if (appError.statusCode >= 500) {
    logger.error({ err: error }, "Erreur interne non gérée");
  }

  res.status(appError.statusCode).json({
    code: appError.code,
    message: appError.message,
    details: appError.details ?? null,
  });
};
