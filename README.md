# Jev Dotation Locale Proof

**Évalue si un dossier de dotation locale contient des preuves suffisamment précises pour être revu.**

[![Tests](https://github.com/gbesse/jev-dotation-locale-proof/actions/workflows/test.yml/badge.svg)](https://github.com/gbesse/jev-dotation-locale-proof/actions/workflows/test.yml) [MIT](LICENSE) · Node.js 22+ · v0.1.0 · Documentation française

Jev Dotation Locale Proof transforme un dossier de dotation sourcé en une catégorie explicite et révisable. Le dépôt sépare les règles vérifiables en code de la comparaison sémantique confiée à Jev.

## Démarrage rapide

```sh
git clone https://github.com/gbesse/jev-dotation-locale-proof.git
cd jev-dotation-locale-proof
npm install
npm run demo
```

Les deux démonstrations utilisent uniquement des données et probabilités synthétiques. Elles n’effectuent aucun appel réseau et ne mesurent pas la qualité réelle de Jev.

## Exemple exécutable

Le scénario principal aboutit à **`preuves_suffisantes`**. Le fournisseur Jev est simulé et une assertion fait échouer la commande si le contrat change.

```js
import { assessGrantEvidence } from "@gbesse/jev-dotation-locale-proof";
import { createFakeProvider } from "@gbesse/jev-dotation-locale-proof/jev";

const provider = createFakeProvider(() => ({
  model: "jev-1.13.0",
  answers: { decision: {
    type: "choice",
    choice: "sufficient_evidence",
    probabilities: {
  "sufficient_evidence": 0.85,
  "incomplete_evidence": 0.05,
  "conflicting_evidence": 0.05,
  "inadmissible": 0.05
},
    confidence: 0.85,
  } },
  usage: { input_tokens: 120, output_tokens: 0 },
}));

const résultat = await assessGrantEvidence({
  "id": "exemple-1",
  "text": "Réhabilitation de la mairie : devis datés, plan de financement voté et calendrier de travaux joints.",
  "source": {
    "url": "https://example.test/donnee-source",
    "date": "2026-09-15"
  },
  "details": {
    "territoire": "Commune Exemple",
    "origine": "donnée synthétique"
  }
}, provider);
console.log(résultat.label);
```

Le fichier complet est [`examples/demo.mjs`](examples/demo.mjs). Lancez-le avec `npm run demo:principal`.

### Cas limite à tester

[`examples/cas-limite.mjs`](examples/cas-limite.mjs) exerce une règle déterministe propre au domaine. Résultat attendu : **`irrecevable`**, avec zéro appel Jev.

```sh
npm run demo:limite
```

`npm run demo` exécute les deux scénarios.

## Frontière de décision

Évalue si un dossier de dotation locale contient des preuves suffisamment précises pour être revu. La sortie sert à ordonner ou préparer une revue humaine. Elle ne constitue ni une décision administrative, ni un avis juridique, ni une garantie d’éligibilité, d’accessibilité, de financement ou de performance.

Les identifiants, dates, valeurs exactes, filtres et cas incontestables restent traités par du code ordinaire. La question et les critères envoyés à Jev sont versionnés dans [`src/index.mjs`](src/index.mjs).

## Sources publiques

- [Dotations de soutien à l’investissement local](https://www.data.gouv.fr/datasets/projets-finances-par-les-dotations-de-soutien-a-linvestissement-des-collectivites-territoriales)

Conservez l’identifiant amont, l’URL, la date de récupération, le millésime et la licence de chaque donnée. Vérifiez le schéma et les conditions de réutilisation auprès du producteur avant ingestion.

## Appels Jev réels

Les appels réels sont facultatifs et payants. Le client valide le modèle et les probabilités, refuse les redirections, limite les nouvelles tentatives aux erreurs réseau et HTTP 429/529, puis bloque une requête dépassant une estimation prudente de 24 000 jetons.

```sh
TYPESAFE_API_KEY=... node scripts/live-smoke.mjs
```

N’envoyez jamais de secret, de donnée personnelle ni de dossier sensible non expurgé. Calibrez les seuils sur un corpus français annoté avant tout usage opérationnel.

## Validation

```sh
npm run check
npm run typecheck
npm test
npm run demo
```

La CI exécute ces vérifications sous Node.js 22 et 24.

Projet indépendant, sans affiliation avec TypeSafe AI, data.gouv.fr ni l’administration française. Consultez la [documentation de l’API Jev](https://docs.typesafe.ai/api) et les [limites du modèle](https://docs.typesafe.ai/model-jaggedness/jev-1.13).
