# ADR-0007 : `node-pg-migrate` avec des migrations SQL

- **Statut** : Acceptée
- **Date** : 2026-11-26
- **Tickets** : HM-11

## Contexte

Le schéma évolue à chaque epic. Il faut des migrations versionnées pour ne jamais modifier la base à la main.

## Décision

`node-pg-migrate` avec des fichiers **SQL** (`-- Up Migration` / `-- Down Migration`), nommés `AAAAMMJJHHMMSS_nom.sql`. Conventions de schéma : `snake_case`, clés primaires UUID, `created_at` et `updated_at` (avec déclencheur), emails en `citext`, rôles en `text` avec contrainte `CHECK`. Détail dans `docs/database.md`.

## Alternatives envisagées

- Knex : outil généraliste, ajoute une couche que le projet n'utilise pas.
- `node-pg-migrate` avec migrations TypeScript : plus programmatique, plus verbeux et moins lisible en relecture.
- Type `ENUM` pour les rôles : plus strict, mais difficile à faire évoluer.

## Conséquences

- Chaque migration a un `Down` écrit à la main.
- Une migration déjà fusionnée n'est jamais modifiée : on en ajoute une nouvelle.
- Pas de génération automatique de migration à partir d'un modèle.
