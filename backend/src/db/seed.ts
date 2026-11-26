import { hash } from "@node-rs/argon2";
import pg from "pg";

// Mot de passe de développement uniquement : ne jamais utiliser en production.
const SEED_PASSWORD = "HandMatch-dev-1";
const ROLES = ["club", "joueur", "entraineur", "benevole", "parent", "admin"] as const;

async function main(): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Le seed de développement est interdit en production.");
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("La variable DATABASE_URL est requise.");
  }

  const client = new pg.Client({ connectionString });
  await client.connect();

  try {
    // Argon2id est l'algorithme par défaut de @node-rs/argon2.
    const passwordHash = await hash(SEED_PASSWORD);

    for (const role of ROLES) {
      await client.query(
        `INSERT INTO users (email, password_hash, role)
         VALUES ($1, $2, $3)
         ON CONFLICT (email) DO NOTHING`,
        [`${role}@handmatch.test`, passwordHash, role],
      );
    }

    console.log(`Seed terminé : ${ROLES.length} comptes (mot de passe : ${SEED_PASSWORD}).`);
  } finally {
    await client.end();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});