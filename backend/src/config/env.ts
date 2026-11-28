import { z } from "zod";

const EXAMPLE_SECRET = "change-me";

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
      .default("info"),
    DATABASE_URL: z.string().min(1),
  })
  .refine((env) => !(env.NODE_ENV === "production" && env.DATABASE_URL.includes(EXAMPLE_SECRET)), {
    path: ["DATABASE_URL"],
    message: `ne doit pas contenir la valeur d'exemple « ${EXAMPLE_SECRET} » en production`,
  });

export type Config = z.infer<typeof envSchema>;

/** Valide un jeu de variables d'environnement ; lève une erreur lisible si invalide. */
export function parseConfig(source: Record<string, string | undefined>): Config {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")} : ${issue.message}`)
      .join("\n");
    throw new Error(`Configuration invalide :\n${problems}`);
  }

  return result.data;
}

// Évaluée une seule fois au chargement : le serveur refuse de démarrer si une variable manque.
export const config: Readonly<Config> = Object.freeze(parseConfig(process.env));
