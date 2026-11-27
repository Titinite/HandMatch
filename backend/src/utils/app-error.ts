/**
 * Erreur métier ou applicative destinée à être renvoyée au client.
 * Le gestionnaire d'erreurs la convertit en réponse JSON standard.
 */
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}
