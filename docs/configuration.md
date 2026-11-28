# Configuration et secrets

## Principes

- Aucun secret dans le dépôt : ni dans le code, ni dans les fichiers versionnés, ni dans l'historique Git.
- `.env.example` est versionné avec des valeurs **factices** ; `.env` ne l'est jamais (`.gitignore`).
- Le backend valide ses variables au démarrage (`backend/src/config/env.ts`, Zod) et refuse de démarrer si l'une manque ou est invalide.
- Les valeurs de développement et de production ne sont **jamais** partagées.

## Variables

| Variable                                            | Lue par            | Rôle                                           |
| --------------------------------------------------- | ------------------ | ---------------------------------------------- |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | Docker Compose, db | Compte et base PostgreSQL                      |
| `LOG_LEVEL`                                         | Backend            | Niveau de logs (`info` par défaut)             |
| `DB_PORT`, `BACKEND_PORT`, `FRONTEND_PORT`          | Docker Compose     | Ports publiés sur 127.0.0.1                    |
| `NODE_ENV`, `PORT`, `DATABASE_URL`                  | Backend            | Fixées par Compose (dev) ou l'hébergeur (prod) |

Les variables `VITE_*` du frontend sont **publiques** (incluses dans le code envoyé au navigateur) : n'y mettre aucun secret.

## Environnements

| Environnement | Source des variables                                                   |
| ------------- | ---------------------------------------------------------------------- |
| Développement | `.env` local (copie de `.env.example`) lu par Docker Compose           |
| Test          | Valeurs factices définies dans `backend/vitest.config.ts`              |
| CI            | Secrets GitHub Actions, uniquement si un job en a besoin (voir HM-17)  |
| Production    | Variables injectées par l'hébergeur, sans fichier `.env` ; voir HM-136 |

En production, le backend refuse une `DATABASE_URL` contenant la valeur d'exemple `change-me`.

## Détection de secrets

Scan de l'historique Git avec [gitleaks](https://github.com/gitleaks/gitleaks) :

```bash
docker run --rm -v "$PWD:/repo" ghcr.io/gitleaks/gitleaks:latest git /repo
```

Le même scan sera exécuté en CI (HM-17).

## Si un secret fuite

1. Considérer le secret comme compromis et le **remplacer** immédiatement (mot de passe, clé, jeton).
2. Retirer la valeur du code, puis nettoyer l'historique si le dépôt est public.
3. Vérifier les journaux d'accès du service concerné.
