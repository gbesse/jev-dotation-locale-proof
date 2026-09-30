// Objectif : vérifier que les types publics sont importables.
import { grantCase, assessGrantEvidence } from "../src/index.mjs";
const dossier = grantCase({
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
});
void assessGrantEvidence(dossier, { decide: async () => ({}) });
