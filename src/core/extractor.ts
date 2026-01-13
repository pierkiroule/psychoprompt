const STOP_WORDS = new Set([
  "le",
  "la",
  "les",
  "un",
  "une",
  "des",
  "du",
  "de",
  "d",
  "et",
  "ou",
  "mais",
  "donc",
  "or",
  "ni",
  "car",
  "je",
  "tu",
  "il",
  "elle",
  "nous",
  "vous",
  "ils",
  "elles",
  "mon",
  "ma",
  "mes",
  "ton",
  "ta",
  "tes",
  "son",
  "sa",
  "ses",
  "ce",
  "cet",
  "cette",
  "ces",
  "dans",
  "sur",
  "sous",
  "avec",
  "sans",
  "pour",
  "par",
  "au",
  "aux",
  "que",
  "qui",
  "quoi",
  "dont",
  "comme",
  "plus",
  "moins",
  "tres",
  "très",
  "hier",
  "aujourd'hui",
  "demain",
  "ici",
  "la",
  "là",
  "en",
  "y",
  "a",
  "est",
  "suis",
  "es",
  "sont",
]);

export const MAX_WORDS = 12;

export function extractSignificantWords(input: string): string[] {
  if (!input) {
    return [];
  }

  const cleaned = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\s'-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return [];
  }

  const words = cleaned
    .split(" ")
    .map((word) => word.trim())
    .filter((word) => word.length > 2)
    .filter((word) => !STOP_WORDS.has(word));

  const unique = Array.from(new Set(words));
  return unique.slice(0, MAX_WORDS);
}
