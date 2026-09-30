// Objectif : montrer une décision sémantique avec des données entièrement synthétiques.
import assert from "node:assert/strict";
import { assessGrantEvidence } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = {
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
};
const provider = createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "sufficient_evidence", probabilities: {
  "sufficient_evidence": 0.85,
  "incomplete_evidence": 0.05,
  "conflicting_evidence": 0.05,
  "inadmissible": 0.05
}, confidence: 0.85 } }, usage: { input_tokens: 120, output_tokens: 0 } }));
const résultat = await assessGrantEvidence(dossier, provider);
assert.equal(résultat.decision, "sufficient_evidence");
assert.equal(provider.calls, 1);
console.log(`Décision : ${résultat.label} · probabilité : ${résultat.probability}`);
