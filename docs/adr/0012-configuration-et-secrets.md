# ADR-0012 : Configuration par variables d'environnement validées au démarrage

- **Statut** : Acceptée
- **Date** : 2026-11-28
- **Tickets** : HM-16

## Contexte

Le projet manipule des secrets (mot de passe de base, plus tard clé de signature et clés tierces). Le dépôt est partagé et son historique est durable : une fuite ne se rattrape pas par un simple retrait.

## Décision

- Configuration uniquement par variables d'environnement, validées au démarrage avec Zod. L'application refuse de démarrer si la configuration est invalide.
- `.env.example` versionné (valeurs factices et commentées), `.env` ignoré.
- Valeurs de développement et de production distinctes ; la valeur d'exemple `change-me` est refusée en production.
- Scan de secrets avec gitleaks sur l'historique, puis en CI.
- Pas de gestionnaire de secrets dédié pour la bêta : à réévaluer au déploiement (HM-136).

## Alternatives envisagées

- Fichiers de configuration par environnement versionnés : risque de secrets dans l'historique.
- Gestionnaire de secrets (Vault, cloud) : disproportionné pour une bêta à un développeur.

## Conséquences

- Toute nouvelle variable est ajoutée au schéma Zod, à `.env.example` et à `docs/configuration.md`.
- Les secrets de CI se déclarent dans GitHub Actions, jamais dans les workflows.
