import { useMemo, useState, type ReactElement } from "react";
import { EMOJIS, THEME_PACKS, getThemeEmoji, getThemeForEmoji } from "./themePacks";

type JournalProps = {
  onSubmit: (payload: { text: string; emojis: string[] }) => void;
};

export function Journal({ onSubmit }: JournalProps): ReactElement {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [activeThemeId, setActiveThemeId] = useState<string | null>(null);

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

  const activeTheme = useMemo(
    () => (activeThemeId ? THEME_PACKS.find((theme) => theme.id === activeThemeId) : undefined),
    [activeThemeId]
  );

  const canUseEmoji = (emoji: string) => {
    if (!activeTheme) {
      return true;
    }
    return activeTheme.emojis.some((entry) => entry.emoji === emoji);
  };

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
      <div className="theme-panel">
        <div className="theme-header">
          <p className="helper">En ce moment, ça me…</p>
          {activeTheme ? (
            <span className="active-theme">
              Thème actuel : {activeTheme.emoji} {activeTheme.label}
            </span>
          ) : (
            <span className="active-theme muted">Aucun thème sélectionné</span>
          )}
        </div>
        <div className="theme-grid" role="list">
          {THEME_PACKS.map((theme) => {
            const isActive = theme.id === activeThemeId;
            return (
              <button
                key={theme.id}
                type="button"
                className={isActive ? "theme-card active" : "theme-card"}
                onClick={() => setActiveThemeId(isActive ? null : theme.id)}
                role="listitem"
                aria-pressed={isActive}
              >
                <span className="theme-emoji">{theme.emoji}</span>
                <span className="theme-label">{theme.label}</span>
                <span className="theme-description">{theme.anchor}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="emoji-grid" role="list">
        {EMOJIS.map((emoji) => {
          const isActive = selected.includes(emoji);
          const isEnabled = canUseEmoji(emoji);
          const theme = getThemeForEmoji(emoji);
          const themeEmoji = getThemeEmoji(emoji);
          return (
            <button
              key={emoji}
              type="button"
              className={
                isActive
                  ? "emoji active"
                  : isEnabled
                  ? "emoji"
                  : "emoji disabled"
              }
              onClick={() => {
                if (isEnabled) {
                  toggleEmoji(emoji);
                }
              }}
              role="listitem"
              aria-pressed={isActive}
              aria-disabled={!isEnabled}
              disabled={!isEnabled}
            >
              <span className="emoji-symbol">{emoji}</span>
              <span className="emoji-title">{themeEmoji?.title}</span>
              <span className="emoji-theme" style={{ color: theme?.color }}>
                {themeEmoji?.caMe}
              </span>
            </button>
          );
        })}
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
