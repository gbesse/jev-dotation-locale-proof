// Objectif : vérifier la normalisation, la règle déterministe et la décision sémantique.
import test from "node:test";
import assert from "node:assert/strict";
import { grantCase, assessGrantEvidence } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const edge = {
  "id": "limite-1",
  "text": "Cas synthétique traité par une règle déterministe avant toute analyse sémantique.",
  "source": {
    "url": "https://example.test/cas-limite",
    "date": "2026-09-16"
  },
  "requestedAmountEur": 0
};
test("exige une source", () => assert.throws(() => grantCase({ id: "x", text: "y" }), /source/));
test("applique le cas limite sans appel Jev", async () => { const provider = createFakeProvider(() => { throw new Error("appel interdit"); }); assert.equal((await assessGrantEvidence(edge, provider)).decision, "inadmissible"); assert.equal(provider.calls, 0); });
test("classe un dossier sourcé", async () => { const provider = createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "sufficient_evidence", probabilities: {
  "sufficient_evidence": 0.85,
  "incomplete_evidence": 0.05,
  "conflicting_evidence": 0.05,
  "inadmissible": 0.05
}, confidence: 0.85 } }, usage: { input_tokens: 10, output_tokens: 0 } })); const result = await assessGrantEvidence({
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
}, provider); assert.equal(result.decision, "sufficient_evidence"); assert.equal(result.review, false); });
