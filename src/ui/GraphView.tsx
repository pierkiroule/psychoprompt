import type { ReactElement } from "react";
import type { GraphNode } from "../core/graph";

type GraphViewProps = {
  nodes: GraphNode[];
  onContinue: () => void;
};

export function GraphView({ nodes, onContinue }: GraphViewProps): ReactElement {
  return (
    <section className="panel">
      <h2>Inconscient Réso•°</h2>
      <p className="helper">Un espace de contemplation. Chaque dépôt nourrit la mémoire symbolique.</p>
      {nodes.length === 0 ? (
        <div className="empty">Aucun élément encore. Dépose un premier fragment.</div>
      ) : (
        <div className="constellation" role="list">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="node"
              role="listitem"
              style={{
                fontSize: `${Math.min(1.8, 1 + node.count * 0.1)}rem`,
                opacity: Math.min(1, 0.5 + node.count * 0.1),
              }}
            >
              {node.label}
            </div>
          ))}
        </div>
      )}
      <button className="primary" type="button" onClick={onContinue}>
        Continuer
      </button>
    </section>
  );
}
