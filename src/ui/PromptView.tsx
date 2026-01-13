import { useMemo, type ReactElement } from "react";
import type { GraphNode } from "../core/graph";

type SelectionViewProps = {
  nodes: GraphNode[];
  present: string[];
  resource: string[];
  onTogglePresent: (label: string) => void;
  onToggleResource: (label: string) => void;
  onGenerate: () => void;
};

export function SelectionView({
  nodes,
  present,
  resource,
  onTogglePresent,
  onToggleResource,
  onGenerate,
}: SelectionViewProps): ReactElement {
  const canGenerate = present.length > 0 && resource.length > 0;

  const message = useMemo(() => {
    if (!nodes.length) {
      return "Le graphe est vide. Dépose un journal d'abord.";
    }
    return "Choisis 1–2 éléments pour le présent et 1–2 pour la direction / ressource.";
  }, [nodes.length]);

  return (
    <section className="panel">
      <h2>Sélection projective</h2>
      <p className="helper">{message}</p>
      <div className="selection-grid">
        {nodes.map((node) => {
          const isPresent = present.includes(node.label);
          const isResource = resource.includes(node.label);
          return (
            <div key={node.id} className="selection-item">
              <div className="label">{node.label}</div>
              <div className="toggle-row">
                <button
                  type="button"
                  className={isPresent ? "pill active" : "pill"}
                  onClick={() => onTogglePresent(node.label)}
                >
                  Présent
                </button>
                <button
                  type="button"
                  className={isResource ? "pill active" : "pill"}
                  onClick={() => onToggleResource(node.label)}
                >
                  Ressource
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button className="primary" type="button" onClick={onGenerate} disabled={!canGenerate}>
        Générer le psychoprompt
      </button>
    </section>
  );
}

type PromptViewProps = {
  prompt: string;
  onReset: () => void;
};

export function PromptView({ prompt, onReset }: PromptViewProps): ReactElement {
  return (
    <section className="panel">
      <h2>Psychoprompt</h2>
      <textarea className="prompt" readOnly value={prompt} rows={10} />
      <div className="button-row">
        <button
          className="primary"
          type="button"
          onClick={() => navigator.clipboard?.writeText(prompt)}
        >
          Copier
        </button>
        <button type="button" className="secondary" onClick={onReset}>
          Nouveau dépôt
        </button>
      </div>
      <p className="helper">Reste ouvert, sans analyse. La description suffit.</p>
    </section>
  );
}
