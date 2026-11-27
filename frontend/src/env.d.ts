interface ImportMetaEnv {
  /** URL de base de l'API (par défaut : /api/v1, relayée par le proxy Vite en développement). */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}