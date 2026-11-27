# ADR-0004 : npm, Node 24 LTS et PostgreSQL 17

- **Statut** : Acceptée
- **Date** : 2026-11-26
- **Tickets** : HM-10, HM-11

## Contexte

Il faut fixer les outils et versions de base pour garantir un environnement reproductible, de la machine de développement à la production.

## Décision

- Gestionnaire de paquets : **npm**.
- Runtime : **Node 24 LTS** (image Docker à version figée, 24.11.1).
- Base de données : **PostgreSQL 17** (image `postgres:17-alpine`).

## Alternatives envisagées

- pnpm : plus rapide et économe en disque, mais un outil de plus à installer et à configurer dans Docker et la CI.
- PostgreSQL 18 : plus récent, mais avec moins de recul.

## Conséquences

- Les verrous `package-lock.json` sont versionnés et utilisés par `npm ci` (Docker et CI).
- Les versions majeures sont revues à l'approche des fins de support (Node 24 : 2028).
