export type ThemePack = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  helper: string;
  emojiIds: string[];
  color: string;
};

export const THEME_PACKS: ThemePack[] = [
  {
    id: "eau",
    label: "Eau",
    emoji: "💧",
    description: "Flux, immersion, traversée.",
    helper: "Ça me submerge / ça me traverse",
    emojiIds: ["💧", "🌀"],
    color: "#9ec9f3",
  },
  {
    id: "feu",
    label: "Feu",
    emoji: "🔥",
    description: "Intensité, tension, ignition.",
    helper: "Ça me brûle / ça me met sous tension",
    emojiIds: ["🔥", "🕯️"],
    color: "#f4a261",
  },
  {
    id: "terre",
    label: "Terre",
    emoji: "🪨",
    description: "Ancrage, poids, matière.",
    helper: "Ça m'alourdit / ça me stabilise",
    emojiIds: ["🪨", "🌿"],
    color: "#b89c7d",
  },
  {
    id: "brume",
    label: "Brume",
    emoji: "🌬️",
    description: "Voile, souffle, flottement.",
    helper: "Ça me dissout / ça m'effleure",
    emojiIds: ["🌬️", "🌑"],
    color: "#c9ced6",
  },
  {
    id: "vivant",
    label: "Vivant",
    emoji: "🐍",
    description: "Corps, instinct, pulsation.",
    helper: "Ça me traverse / ça m'anime",
    emojiIds: ["🐍", "🌸"],
    color: "#8fcf8a",
  },
  {
    id: "cosmos",
    label: "Cosmos",
    emoji: "🌕",
    description: "Cycles, nocturne, vastes échos.",
    helper: "Ça me dépasse / ça me contient",
    emojiIds: ["🌕", "🦉"],
    color: "#b6a2e3",
  },
];

const themeByEmoji = new Map<string, ThemePack>();
THEME_PACKS.forEach((theme) => {
  theme.emojiIds.forEach((emoji) => {
    themeByEmoji.set(emoji, theme);
  });
});

export const EMOJIS = THEME_PACKS.flatMap((theme) => theme.emojiIds);

export const getThemeForEmoji = (emoji: string): ThemePack | undefined => themeByEmoji.get(emoji);
