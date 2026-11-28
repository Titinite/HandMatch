# Décisions techniques (ADR)

Un ADR (Architecture Decision Record) consigne une décision structurante : son contexte, le choix retenu, les alternatives écartées et les conséquences. Il permet de retrouver _pourquoi_ une décision a été prise.

## Quand écrire un ADR

Dès qu'une décision est difficile à défaire ou qu'elle structure le projet : choix d'une technologie, d'une architecture, d'une règle de sécurité ou d'une règle produit qui contraint le code.

## Comment

1. Copier `template.md` vers `NNNN-titre-en-kebab-case.md` (numéro suivant).
2. Le rédiger dans la **même PR** que le changement concerné.
3. Ajouter une ligne à l'index ci-dessous.

Un ADR n'est **jamais réécrit**. Pour changer de décision, on écrit un nouvel ADR et on passe l'ancien au statut « Remplacée par ADR-NNNN ».

## Index

| N°                                         | Décision                                                          | Statut   |
| ------------------------------------------ | ----------------------------------------------------------------- | -------- |
| [0001](0001-monorepo.md)                   | Monorepo (frontend, backend, docs)                                | Acceptée |
| [0002](0002-conventions-git.md)            | Conventions Git et protection de `main`                           | Acceptée |
| [0003](0003-typescript-strict.md)          | TypeScript strict partout                                         | Acceptée |
| [0004](0004-npm-node-postgresql.md)        | npm, Node 24 LTS et PostgreSQL 17                                 | Acceptée |
| [0005](0005-docker-compose-watch.md)       | Docker Compose avec `watch`                                       | Acceptée |
| [0006](0006-pg-sans-orm.md)                | Accès à la base via `pg`, sans ORM                                | Acceptée |
| [0007](0007-migrations-sql.md)             | `node-pg-migrate` avec migrations SQL                             | Acceptée |
| [0008](0008-argon2id.md)                   | Hash des mots de passe en Argon2id                                | Acceptée |
| [0009](0009-pas-de-messagerie-beta.md)     | Pas de messagerie interne pendant la bêta                         | Acceptée |
| [0010](0010-verification-ffhb-manuelle.md) | Vérification FFHB manuelle                                        | Acceptée |
| [0011](0011-conventions-frontend.md)       | Conventions frontend et accessibilité des tokens                  | Acceptée |
| [0012](0012-configuration-et-secrets.md)   | Configuration par variables d'environnement validées au démarrage | Acceptée |
