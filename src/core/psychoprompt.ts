export type PromptPayload = {
  selected: string[];
  relations: string[];
  memoryCount: number;
};

const PROMPT_OPENERS = [
  "Imagine une scène intérieure calme",
  "Laisse venir une image douce",
  "Ferme les yeux et laisse apparaître un paysage",
  "Invite un symbole qui te parle",
  "Accueille une métaphore simple",
];

const PROMPT_GUIDES = [
  "décris-la avec des détails sensoriels",
  "observe la lumière, les textures, les distances",
  "remarque ce qui bouge et ce qui reste",
  "note ce qui attire naturellement ton attention",
  "laisse un élément discret entrer dans la scène",
];

const PROMPT_CLOSERS = [
  "Prends ton temps pour écrire ce que tu vois.",
  "Reste ouvert à ce qui se présente.",
  "Tu peux rester dans le simple et le vivant.",
  "Tu n'as rien à expliquer, seulement à décrire.",
  "Garde une tonalité douce et personnelle.",
];

function pick<T>(items: T[], seed: number): T {
  const index = Math.abs(seed) % items.length;
  return items[index];
}

export function generatePrompt(payload: PromptPayload): string {
  const selectedText = payload.selected.length
    ? payload.selected.join(", ")
    : "aucun élément explicite";
  const relationText = payload.relations.length
    ? payload.relations.join(" · ")
    : "aucune relation explicite";

  const seed = payload.selected.join("").length;

  const opener = pick(PROMPT_OPENERS, seed + payload.memoryCount);
  const guide = pick(PROMPT_GUIDES, seed + payload.memoryCount * 2);
  const closer = pick(PROMPT_CLOSERS, seed + payload.memoryCount * 3);

  return [
    "Rôle de l'IA : IA externe, accompagnant non directif, attentif et descriptif.",
    "Cadre éthique : aucune analyse, aucun diagnostic, aucune explication imposée.",
    `Configuration symbolique actuelle : ${selectedText}.`,
    `Relations notées dans le graphe : ${relationText}.`,
    `${opener}. ${guide}.`,
    "Invite une forme symbolique ouverte (texte, image mentale ou scène).",
    closer,
  ].join(" ");
}
