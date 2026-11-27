# ADR-0001 : Monorepo (frontend, backend, docs)

- **Statut** : Acceptée
- **Date** : 2026-11-25
- **Tickets** : HM-9

## Contexte

HandMatch est développé en solo, avec un frontend (Vue), un backend (Express) et une documentation de conception. Il faut un cadre simple pour versionner, relire et déployer l'ensemble.

## Décision

Un seul dépôt GitHub, organisé en `frontend/`, `backend/` et `docs/`, avec la configuration commune (Docker Compose, hooks Git, Prettier, CI) à la racine.

## Alternatives envisagées

- Un dépôt par application : isole les cycles de vie, mais multiplie les PR, les pipelines et la synchronisation des versions pour un projet mené seul.
- Monorepo avec workspaces npm : mutualise les dépendances, mais complique les contextes de build Docker. Écarté pour l'instant.

## Conséquences

- Un changement qui touche l'API et l'interface passe dans une seule PR.
- Chaque application garde son `package.json` et son verrou ; seul l'outillage Git est à la racine.
- Le contexte de build Docker est la racine du dépôt (un `.dockerignore` unique).
- La CI devra filtrer par dossier pour ne pas tout reconstruire à chaque changement.
