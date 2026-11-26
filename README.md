# HandMatch

Plateforme web de mise en relation pour le handball amateur : recrutement de joueurs, entraîneurs et bénévoles par les clubs.

> README complet (installation, scripts, architecture) : ticket dédié, à venir.

## Structure du dépôt

| Dossier | Contenu |
|---|---|
| `frontend/` | Application Vue.js |
| `backend/` | API Node.js / Express |
| `docs/` | Documentation et livrables de conception |

## Conventions

### Branches

Chaque branche part de `main` et porte la clé du ticket Jira :

`feature/HM-<n>-description-courte` (aussi `fix/`, `chore/`, `docs/`)

Exemple : `feature/HM-9-init-repo-structure`

### Commits

[Conventional Commits](https://www.conventionalcommits.org/fr/) : `type(portée): description` à l'impératif.

Types : `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
Exemple : `feat(clubs): ajouter la création d'un club (HM-20)`

### Pull requests

- Une PR par ticket, titre au format Conventional Commits (il devient le message du commit après le squash)
- `main` est protégée : pas de push direct, PR obligatoire, historique linéaire
- Merge en squash, branche supprimée après le merge