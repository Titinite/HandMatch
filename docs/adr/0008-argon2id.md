# ADR-0008 : Hash des mots de passe en Argon2id

- **Statut** : Acceptée
- **Date** : 2026-11-26
- **Tickets** : HM-11, HM-14

## Contexte

La plateforme stocke des mots de passe, y compris de parents et de responsables de clubs. Le hash doit résister aux attaques par force brute matérielle.

## Décision

Argon2id, via la bibliothèque `@node-rs/argon2` (binaires précompilés, aucune compilation dans l'image Docker Alpine).

## Alternatives envisagées

- bcrypt : très répandu, mais plus ancien et limité à 72 octets.
- Paquet `argon2` : même algorithme, mais impose une compilation native.
- scrypt (natif Node) : acceptable, moins recommandé qu'Argon2id.

## Conséquences

- Le seed de développement utilise un mot de passe connu, interdit en production.
- Les paramètres de coût sont ceux par défaut de la bibliothèque ; ils seront revus dans le ticket d'authentification (HM-14).
