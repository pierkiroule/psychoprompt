export type PromptPayload = {
  present: string[];
  resource: string[];
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
  const presentText = payload.present.length
    ? `présent : ${payload.present.join(", ")}`
    : "présent : sensation ouverte";
  const resourceText = payload.resource.length
    ? `ressource : ${payload.resource.join(", ")}`
    : "ressource : appui simple";

  const seed = payload.present.join("").length + payload.resource.join("").length;

  const opener = pick(PROMPT_OPENERS, seed + payload.memoryCount);
  const guide = pick(PROMPT_GUIDES, seed + payload.memoryCount * 2);
  const closer = pick(PROMPT_CLOSERS, seed + payload.memoryCount * 3);

  return [
    `${opener}.`,
    `Dans cette scène, laisse apparaître ${presentText} et ${resourceText}.`,
    `Sans analyser, ${guide}.`,
    "Si une image symbolique se forme, décris-la simplement.",
    closer,
  ].join(" ");
}
