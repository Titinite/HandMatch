# ADR-0002 : Conventions Git et protection de `main`

- **Statut** : Acceptée
- **Date** : 2026-11-25
- **Tickets** : HM-9, HM-12

## Contexte

Même en solo, l'historique doit rester lisible, relié aux tickets Jira, et `main` ne doit recevoir que du code relu et vérifié.

## Décision

- `main` est protégée par une règle (ruleset) : pull request obligatoire, historique linéaire, pas de force push ni de suppression.
- Fusion uniquement par **squash** ; les branches fusionnées sont supprimées.
- Branches nommées `feature/HM-<n>-description-courte` (aussi `fix/`, `chore/`, `docs/`).
- Commits au format Conventional Commits, avec la clé du ticket à la fin du titre : `type(portée): description (HM-n)`. Le format est vérifié par commitlint (hook Git).

## Alternatives envisagées

- Push direct sur `main` : plus rapide, mais aucun filet de sécurité et pas de relecture.
- GitFlow : trop lourd pour un développeur seul.
- Fusion par merge commit ou rebase : historique moins lisible ou plus fragile.

## Conséquences

- Le titre de la PR devient le message du commit sur `main` : il doit respecter le format (la PR #7 a été fusionnée avec un titre non conforme).
- Les hooks Git exigent Node sur la machine de développement.
- Une vérification automatique du titre des PR sera ajoutée à la CI (HM-17).
