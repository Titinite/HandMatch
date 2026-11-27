# ADR-0006 : Accès à la base via `pg`, sans ORM

- **Statut** : Acceptée
- **Date** : 2026-11-26
- **Tickets** : HM-11, HM-12

## Contexte

Le modèle de données porte des règles sensibles (protection des mineurs, visibilité des profils) qui doivent rester explicites et vérifiables. L'équipe est un développeur seul.

## Décision

Accès direct à PostgreSQL avec le client `pg` (pool de connexions) et des **requêtes paramétrées uniquement**. Le code est organisé en couches : routes, contrôleurs, services, dépôts (`repositories/`, seule couche qui touche la base).

## Alternatives envisagées

- Prisma, Drizzle, TypeORM : types générés et productivité, mais une couche d'abstraction de plus, et des requêtes moins visibles pour les règles de confidentialité.
- Knex (query builder) : intermédiaire, mais peu d'intérêt avec du SQL simple.

## Conséquences

- Plus de SQL écrit à la main ; les types des lignes sont écrits à la main dans les dépôts.
- Contrôle total des requêtes et de leurs performances.
- La décision est à revoir si l'écriture des dépôts devient répétitive.
