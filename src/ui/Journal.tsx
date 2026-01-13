import { useMemo, useState, type ReactElement } from "react";

const EMOJIS = ["🌿", "🪨", "🔥", "💧", "🌕", "🌑", "🕯️", "🦉", "🐍", "🌀", "🌬️", "🌸"];

type JournalProps = {
  onSubmit: (payload: { text: string; emojis: string[] }) => void;
};

export function Journal({ onSubmit }: JournalProps): ReactElement {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const canSubmit = text.trim().length > 0 || selected.length > 0;

  const toggleEmoji = (emoji: string) => {
    setSelected((prev) =>
      prev.includes(emoji) ? prev.filter((item) => item !== emoji) : [...prev, emoji]
    );
  };

  const helperText = useMemo(() => {
    if (!canSubmit) {
      return "Dépose quelques mots ou un symbole.";
    }
    return "Tu peux déposer maintenant.";
  }, [canSubmit]);

  return (
    <section className="panel">
      <h2>Journal projectif</h2>
      <label className="field">
        <span>État d&apos;âme du moment</span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Écris librement."
          rows={5}
        />
      </label>
      <div className="emoji-grid" role="list">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            className={selected.includes(emoji) ? "emoji active" : "emoji"}
            onClick={() => toggleEmoji(emoji)}
            role="listitem"
            aria-pressed={selected.includes(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
      <p className="helper">{helperText}</p>
      <button
        className="primary"
        type="button"
        onClick={() => {
          onSubmit({ text, emojis: selected });
          setText("");
          setSelected([]);
        }}
        disabled={!canSubmit}
      >
        Déposer
      </button>
    </section>
  );
}
