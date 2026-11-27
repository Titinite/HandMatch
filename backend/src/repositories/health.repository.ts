import { pool } from "../db/pool.js";

/** Vérifie que la base répond. Lève une erreur sinon. */
export async function pingDatabase(): Promise<void> {
  await pool.query("SELECT 1");
}
