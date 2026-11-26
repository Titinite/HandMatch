# Base de données

PostgreSQL 17, accès via `pg` (requêtes paramétrées, sans ORM). Le schéma est géré uniquement par des migrations versionnées : **aucune modification manuelle de la base**.

## Outil de migrations

[`node-pg-migrate`](https://salsita.github.io/node-pg-migrate/) avec des migrations en **SQL**.

Choix : outil dédié à PostgreSQL, cohérent avec l'accès direct par `pg`, et des fichiers SQL lisibles et relisables sans code intermédiaire.

## Commandes

À lancer dans le conteneur `backend` (la stack doit tourner) :

```bash
docker compose exec backend npm run migrate:up           # applique toutes les migrations
docker compose exec backend npm run migrate:down -- 1    # annule la dernière migration
docker compose exec backend npm run migrate:down -- 2    # annule les deux dernières
docker compose exec backend npm run seed                 # comptes de test (dev uniquement)
```

## Créer une migration

Créer le fichier `backend/migrations/AAAAMMJJHHMMSS_nom-en-kebab-case.sql` (heure UTC) :

```sql
-- Up Migration

-- Down Migration
```

Règles :

- Chaque migration a un `Up` **et** un `Down` fonctionnels (le `Down` défait exactement le `Up`).
- Une migration déjà fusionnée dans `main` n'est **jamais modifiée** : on en ajoute une nouvelle.
- Une migration = un changement cohérent (une table, un index, une évolution).

## Conventions de nommage

| Élément | Règle | Exemple |
|---|---|---|
| Tables et colonnes | `snake_case`, pluriel pour les tables | `users`, `password_hash` |
| Clé primaire | `id uuid DEFAULT gen_random_uuid()` | |
| Dates | `timestamptz`, `created_at` et `updated_at` sur chaque table | |
| Clé étrangère | `<table_cible_singulier>_id` | `club_id` |
| Contrainte unique | `<table>_<colonne>_key` | `users_email_key` |
| Contrainte de vérification | `<table>_<colonne>_check` | `users_role_check` |
| Clé étrangère (contrainte) | `<table>_<colonne>_fkey` | `offers_club_id_fkey` |
| Index | `<table>_<colonnes>_idx` | `offers_club_id_idx` |
| Déclencheur `updated_at` | `<table>_set_updated_at` (fonction `set_updated_at()`) | `users_set_updated_at` |

## Choix de conception

- Emails en `citext` : unicité insensible à la casse garantie par la base.
- Rôles en `text` avec contrainte `CHECK` plutôt qu'un type `ENUM` : plus simple à faire évoluer.
- Mots de passe hashés en Argon2id (`@node-rs/argon2`). Le seed utilise un mot de passe de développement connu : il est interdit en production.