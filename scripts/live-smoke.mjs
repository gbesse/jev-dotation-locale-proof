// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessGrantEvidence } from "../src/index.mjs";
const client = createJevClient();
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
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
