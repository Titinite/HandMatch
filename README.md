# HandMatch

Plateforme web de mise en relation pour le handball amateur : recrutement de joueurs, entraîneurs et bénévoles par les clubs.

> README complet (installation, scripts, architecture) : ticket dédié, à venir.

## Structure du dépôt

| Dossier     | Contenu                                  |
| ----------- | ---------------------------------------- |
| `frontend/` | Application Vue.js                       |
| `backend/`  | API Node.js / Express                    |
| `docs/`     | Documentation et livrables de conception |

## Lancer l'environnement de développement

Prérequis : Docker Desktop (Compose v2.22 ou plus).

```bash
cp .env.example .env        # PowerShell : Copy-Item .env.example .env
docker compose up --build --watch
```

| Service               | URL                                     |
| --------------------- | --------------------------------------- |
| Frontend (Vue + Vite) | http://127.0.0.1:5173                   |
| Backend (Express)     | http://127.0.0.1:3000/api/v1/health     |
| PostgreSQL            | 127.0.0.1:5432 (accès local uniquement) |

- `Ctrl+C` arrête la stack ; `docker compose down` supprime les conteneurs et conserve les données.
- `docker compose down -v` supprime aussi les données de la base.
- Le code source est synchronisé dans les conteneurs (`--watch`) : pas de reconstruction pour une modification de code. Une modification de `package.json` ou du verrou déclenche une reconstruction automatique.

### Base de données

```bash
docker compose exec backend npm run migrate:up   # applique les migrations
docker compose exec backend npm run seed         # comptes de test (dev uniquement)
```

Conventions de schéma et guide des migrations : [`docs/database.md`](docs/database.md).

## Qualité du code

Prérequis : Node 24 LTS sur la machine de développement (les hooks et les outils de qualité s'exécutent hors Docker).

```bash
npm install                 # à la racine : installe les hooks Git (Husky)
npm --prefix backend install
```

À chaque commit, les hooks vérifient automatiquement :

- les fichiers modifiés (ESLint et Prettier, via lint-staged) ;
- le message de commit (commitlint).

Commandes du backend (`npm --prefix backend run <commande>`) :

| Commande                  | Rôle                                    |
| ------------------------- | --------------------------------------- |
| `lint` / `lint:fix`       | Analyse ESLint, avec ou sans correction |
| `format` / `format:check` | Formatage Prettier                      |
| `typecheck`               | Vérification TypeScript                 |
| `test`                    | Tests Vitest                            |
| `build`                   | Compilation vers `dist/`                |

## Décisions techniques

Les décisions structurantes sont consignées dans [`docs/adr`](docs/adr/README.md) (ADR). Toute décision de ce type passe par un ADR, dans la même PR que le changement.

## Conventions

### Branches

Chaque branche part de `main` et porte la clé du ticket Jira :

`feature/HM-<n>-description-courte` (aussi `fix/`, `chore/`, `docs/`)

Exemple : `feature/HM-9-init-repo-structure`

### Commits

[Conventional Commits](https://www.conventionalcommits.org/fr/) : `type(portée): description (HM-<n>)`, à l'impératif, avec la clé du ticket Jira à la fin du titre.

Types : `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
Exemple : `feat(clubs): ajouter la création d'un club (HM-20)`

Le format est vérifié automatiquement à chaque commit (commitlint).

### Pull requests

- Une PR par ticket, titre au format Conventional Commits (il devient le message du commit après le squash)
- `main` est protégée : pas de push direct, PR obligatoire, historique linéaire
- Merge en squash, branche supprimée après le merge
