# ADR-0010 : Vérification FFHB manuelle

- **Statut** : Acceptée
- **Date** : Décision prise en phase de conception, consignée le 2026-11-27
- **Tickets** : HM-21, HM-28

## Contexte

La confiance dans les clubs est centrale. La Fédération française de handball ne propose pas d'API publique pour vérifier l'existence d'un club.

## Décision

Vérification manuelle de chaque club par recoupement avec l'annuaire public de la FFHB, avec un objectif d'activation sous 48 heures.

## Alternatives envisagées

- Déclaration seule, sans vérification : rapide, mais ouvre la porte aux faux clubs.
- Envoi de justificatifs : plus lourd pour les clubs et plus de données personnelles à protéger.

## Conséquences

- Charge de travail pour le modérateur, supportable avec 8 à 12 clubs en bêta.
- Ne passe pas à l'échelle : à revoir si le volume de clubs augmente.
