# Comment la décision est prise

Évalue si un dossier de dotation locale contient des preuves suffisamment précises pour être revu.

Le code normalise la source et applique d’abord le cas déterministe documenté dans `src/index.mjs`. Pour les autres dossiers, Jev choisit parmi quatre catégories en se limitant au texte et aux métadonnées fournis. Une confiance inférieure à 0,8 marque le résultat pour revue.

La démonstration ne contient que des probabilités synthétiques. Constituez un corpus français annoté, mesurez les erreurs par catégorie et fixez vos propres seuils avant un usage opérationnel.
