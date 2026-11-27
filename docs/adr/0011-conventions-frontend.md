# ADR-0011 : Conventions frontend et accessibilité des tokens

- **Statut** : Acceptée
- **Date** : 2026-11-27
- **Tickets** : HM-13

## Contexte

Le frontend doit rester cohérent avec la charte graphique, lisible pour un développeur seul, et accessible. Plusieurs couleurs de la charte v1.0 ne respectent pas le contraste WCAG AA (4,5:1) pour du texte courant.

## Décision

- Les pages vivent dans `src/pages/` et portent le suffixe `Page` ; les composants de base sont dans `src/components/base/` (préfixe `Base`).
- Les blocs d'un composant Vue suivent l'ordre `template`, `script`, `style`, imposé par ESLint (`vue/block-order`).
- Les couleurs sont définies **uniquement** dans `assets/styles/tokens.css` ; les composants n'utilisent que des variables. Un test interdit les couleurs brutes ailleurs, et réserve les couleurs de protection des mineurs à ce fichier.
- Les paires texte et fond des tokens sont vérifiées par un test de contraste AA. Écarts à la charte : texte du bouton principal en marine sur orange (≈ 4,9:1 au lieu de ≈ 2,9:1), et teintes plus foncées du vert « accepté » et de l'orange « en attente ».
- Polices hébergées par le projet (`@fontsource`), sans service tiers (RGPD).
- Le formatage (Prettier) et les corrections ESLint s'appliquent à l'enregistrement dans VSCode, via `.vscode/settings.json` versionné ; les extensions recommandées sont listées dans `.vscode/extensions.json`.

## Alternatives envisagées

- Conserver strictement la charte : fidèle aux maquettes, mais non conforme AA.
- Fond orange foncé pour le bouton principal : conforme, mais s'éloigne davantage de la couleur de marque.

## Conséquences

- La charte graphique (document HTML) doit être mise à jour pour refléter ces écarts.
- Tout nouveau token de couleur doit passer le test de contraste avant d'être ajouté à la liste des paires vérifiées.
