# ADR-0005 : Docker Compose avec `watch` pour le développement

- **Statut** : Acceptée
- **Date** : 2026-11-26
- **Tickets** : HM-10

## Contexte

Le développement se fait sous Windows. Les bind mounts sur le code source y notifient mal les changements de fichiers dans les conteneurs, et imposent des volumes spécifiques pour `node_modules`.

## Décision

Lancer la stack avec `docker compose up --build --watch`. Le code source est synchronisé dans les conteneurs ; un changement de `package.json`, du verrou ou de la configuration TypeScript reconstruit l'image. Les conteneurs tournent avec l'utilisateur non-root `node`, et tous les ports sont publiés sur `127.0.0.1` uniquement.

## Alternatives envisagées

- Bind mounts : prévus par le ticket initial, mais peu fiables sous Windows (rechargement à chaud, droits, `node_modules`).
- Développement hors Docker : écarte la reproductibilité entre machines et avec la CI.

## Conséquences

- Docker Compose 2.22 ou plus est requis.
- Les fichiers créés dans un conteneur ne sont pas recopiés sur la machine : les outils d'écriture (lint, format, création de migrations) s'exécutent sur la machine de développement.
- La configuration de production est hors périmètre (HM-136).
