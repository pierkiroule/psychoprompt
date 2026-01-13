export type ThemeEmoji = {
  id: string;
  emoji: string;
  title: string;
  caMe: string;
};

export type ThemePack = {
  id: string;
  label: string;
  emoji: string;
  anchor: string;
  color: string;
  emojis: ThemeEmoji[];
};

export const THEME_PACKS: ThemePack[] = [
  {
    id: "brume",
    label: "Brume",
    emoji: "🌫️",
    anchor: "Ça me perd / ça me suspend",
    color: "#9aa0a6",
    emojis: [
      { id: "brouillard", emoji: "🌫️", title: "Brouillard", caMe: "ça me perd" },
      { id: "nuit", emoji: "🌑", title: "Nuit", caMe: "ça me met dans le noir" },
      { id: "flottement", emoji: "🌀", title: "Flottement", caMe: "ça me fait tourner" },
      { id: "creux", emoji: "🕳️", title: "Creux", caMe: "ça me creuse" },
      { id: "dissolution", emoji: "🫥", title: "Dissolution", caMe: "ça me dissout" },
      { id: "suspension", emoji: "😶", title: "Suspension", caMe: "ça me fige" },
      { id: "veille", emoji: "🌙", title: "Veille", caMe: "ça me met en veille" },
    ],
  },
  {
    id: "eau",
    label: "Eau",
    emoji: "🌊",
    anchor: "Ça me traverse / ça me submerge",
    color: "#4aa3df",
    emojis: [
      { id: "debordement", emoji: "🌊", title: "Débordement", caMe: "ça me submerge" },
      { id: "goutte", emoji: "💧", title: "Goutte", caMe: "ça me touche" },
      { id: "ruissellement", emoji: "🌧️", title: "Ruissellement", caMe: "ça me fait couler" },
      { id: "refuge", emoji: "🐚", title: "Refuge", caMe: "ça me replie" },
      { id: "battement", emoji: "🫀", title: "Battement", caMe: "ça me bat dedans" },
      { id: "bulle", emoji: "🫧", title: "Bulle", caMe: "ça me rend fragile" },
      { id: "soutien", emoji: "🫶", title: "Soutien", caMe: "ça me soutient" },
    ],
  },
  {
    id: "feu",
    label: "Feu",
    emoji: "🔥",
    anchor: "Ça me brûle / ça me pousse",
    color: "#e5533d",
    emojis: [
      { id: "brulure", emoji: "🔥", title: "Brûlure", caMe: "ça me brûle" },
      { id: "tension", emoji: "⚡", title: "Tension", caMe: "ça me crispe" },
      { id: "pression", emoji: "🌋", title: "Pression", caMe: "ça me met sous pression" },
      { id: "rupture", emoji: "🧨", title: "Rupture", caMe: "ça me fait exploser" },
      { id: "impulsion", emoji: "🐆", title: "Impulsion", caMe: "ça me propulse" },
      { id: "vitalite", emoji: "🩸", title: "Vitalité", caMe: "ça me fait vivre fort" },
      { id: "exposition", emoji: "☀️", title: "Exposition", caMe: "ça m’expose" },
    ],
  },
  {
    id: "terre",
    label: "Terre",
    emoji: "🪨",
    anchor: "Ça me pèse / ça me tient",
    color: "#8b6f4e",
    emojis: [
      { id: "lourdeur", emoji: "🪨", title: "Lourdeur", caMe: "ça me pèse" },
      { id: "mur", emoji: "🧱", title: "Mur", caMe: "ça me bloque" },
      { id: "appui", emoji: "🪵", title: "Appui", caMe: "ça me tient" },
      { id: "protection", emoji: "🛡️", title: "Protection", caMe: "ça me protège" },
      { id: "ralentissement", emoji: "🐢", title: "Ralentissement", caMe: "ça me ralentit" },
      { id: "masse", emoji: "🏔️", title: "Masse", caMe: "ça me plaque" },
      { id: "ajustement", emoji: "⚖️", title: "Ajustement", caMe: "ça me met en balance" },
    ],
  },
  {
    id: "vivant",
    label: "Vivant",
    emoji: "🌱",
    anchor: "Ça me répare / ça me fait émerger",
    color: "#5fb36a",
    emojis: [
      { id: "emergence", emoji: "🌱", title: "Émergence", caMe: "ça me fait reprendre" },
      {
        id: "soutien_vivant",
        emoji: "🌿",
        title: "Soutien vivant",
        caMe: "ça me soutient doucement",
      },
      {
        id: "transformation_lente",
        emoji: "🍄",
        title: "Transformation lente",
        caMe: "ça me transforme lentement",
      },
      { id: "tempo", emoji: "🐌", title: "Tempo", caMe: "ça me ralentit juste" },
      { id: "ouverture", emoji: "🌼", title: "Ouverture", caMe: "ça m’ouvre" },
      { id: "continuite", emoji: "🧬", title: "Continuité", caMe: "ça me relie dans le temps" },
      { id: "nid", emoji: "🪺", title: "Nid", caMe: "ça me met à l’abri" },
    ],
  },
  {
    id: "cosmos",
    label: "Cosmos",
    emoji: "🌌",
    anchor: "Ça me dépasse / ça me relie",
    color: "#7b6cd9",
    emojis: [
      { id: "vastitude", emoji: "🌌", title: "Vastitude", caMe: "ça me dépasse" },
      { id: "gravitation", emoji: "🪐", title: "Gravitation", caMe: "ça m’attire" },
      { id: "resonance", emoji: "✨", title: "Résonance", caMe: "ça résonne" },
      { id: "intuition", emoji: "🔮", title: "Intuition", caMe: "ça me guide" },
      { id: "presence", emoji: "🧿", title: "Présence", caMe: "ça me regarde" },
      { id: "temporalite", emoji: "🕰️", title: "Temporalité", caMe: "ça me situe dans le temps" },
      { id: "question", emoji: "💭", title: "Question", caMe: "ça me questionne" },
    ],
  },
];

const themeByEmoji = new Map<string, ThemePack>();
const themeEmojiBySymbol = new Map<string, ThemeEmoji>();

THEME_PACKS.forEach((theme) => {
  theme.emojis.forEach((entry) => {
    themeByEmoji.set(entry.emoji, theme);
    themeEmojiBySymbol.set(entry.emoji, entry);
  });
});

export const EMOJIS = THEME_PACKS.flatMap((theme) => theme.emojis.map((entry) => entry.emoji));

export const getThemeForEmoji = (emoji: string): ThemePack | undefined => themeByEmoji.get(emoji);

export const getThemeEmoji = (emoji: string): ThemeEmoji | undefined => themeEmojiBySymbol.get(emoji);
