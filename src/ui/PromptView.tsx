import { useMemo, type ReactElement } from "react";
import type { GraphNode } from "../core/graph";

type SelectionViewProps = {
  nodes: GraphNode[];
  selection: string[];
  minSelection: number;
  maxSelection: number;
  onToggle: (label: string) => void;
  onGenerate: () => void;
};

export function SelectionView({
  nodes,
  selection,
  minSelection,
  maxSelection,
  onToggle,
  onGenerate,
}: SelectionViewProps): ReactElement {
  const canGenerate = selection.length >= minSelection && selection.length <= maxSelection;

  const message = useMemo(() => {
    if (!nodes.length) {
      return "Le graphe est vide. Dépose un journal d'abord.";
    }
    return "Sélectionne ce qui résonne pour toi maintenant.";
  }, [nodes.length]);

  return (
    <section className="panel">
      <h2>Sélection projective</h2>
      <p className="helper">{message}</p>
      <p className="helper">
        {selection.length} sélectionné{selection.length > 1 ? "s" : ""} (entre{" "}
        {minSelection} et {maxSelection}).
      </p>
      <div className="selection-grid">
        {nodes.map((node) => {
          const isSelected = selection.includes(node.label);
          return (
            <div key={node.id} className="selection-item">
              <div className="label">{node.label}</div>
              <div className="toggle-row">
                <button
                  type="button"
                  className={isSelected ? "pill active" : "pill"}
                  onClick={() => onToggle(node.label)}
                >
                  Résonne
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
