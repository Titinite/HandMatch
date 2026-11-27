# ADR-0003 : TypeScript strict partout

- **Statut** : Acceptée
- **Date** : 2026-11-26
- **Tickets** : HM-10, HM-12, HM-13

## Contexte

La plateforme manipule des données sensibles, dont celles de mineurs. Les erreurs de type et de données doivent être détectées le plus tôt possible. Les tickets prévoyaient initialement du JavaScript.

## Décision

TypeScript en mode strict (avec `noUncheckedIndexedAccess`) pour le backend et le frontend. Le backend est en ESM (`NodeNext`), exécuté en développement avec `tsx`.

## Alternatives envisagées

- JavaScript seul : plus simple au départ, mais aucun contrôle de type.
- JavaScript avec JSDoc : types partiels et peu contraignants.

## Conséquences

- Un `typecheck` et un lint typé (typescript-eslint) font partie des contrôles qualité.
- La version de TypeScript est contrainte à `>=5.9 <6.1`, car typescript-eslint ne supporte pas encore TypeScript 7. Cette contrainte sera revue quand le support arrivera.
- Les imports relatifs doivent porter l'extension `.js` (règle d'ESM avec `NodeNext`).
