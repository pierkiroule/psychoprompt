import type { ReactElement } from "react";

type PromptViewProps = {
  prompt: string;
  onClear: () => void;
};

export function PromptView({ prompt, onClear }: PromptViewProps): ReactElement {
  return (
    <section className="panel">
      <h3>Psychoprompt (IA externe)</h3>
      <textarea className="prompt" readOnly value={prompt} rows={8} />
      <div className="button-row">
        <button
          className="primary"
          type="button"
          onClick={() => navigator.clipboard?.writeText(prompt)}
        >
          Copier
        </button>
        <button type="button" className="secondary" onClick={onClear}>
          Effacer le prompt
        </button>
      </div>
      <p className="helper">Le texte reste descriptif et ouvert.</p>
    </section>
  );
}
