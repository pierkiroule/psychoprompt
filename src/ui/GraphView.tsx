import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import type { GraphEdge, GraphNode } from "../core/graph";

type GraphViewProps = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selection: string[];
  onToggle: (id: string) => void;
};

type SimNode = SimulationNodeDatum & GraphNode;
type SimLink = SimulationLinkDatum<SimNode> & { count: number };

const VIEWBOX_SIZE = 1000;

export function GraphView({ nodes, edges, selection, onToggle }: GraphViewProps): ReactElement {
  const [simNodes, setSimNodes] = useState<SimNode[]>([]);
  const rafRef = useRef<number | null>(null);
  const positionsRef = useRef(new Map<string, { x: number; y: number }>());

  const simLinks = useMemo<SimLink[]>(() => {
    return edges.map((edge) => ({
      source: edge.a,
      target: edge.b,
      count: edge.count,
    }));
  }, [edges]);

  useEffect(() => {
    const nextNodes: SimNode[] = nodes.map((node) => {
      const previous = positionsRef.current.get(node.id);
      return {
        ...node,
        x: previous?.x ?? VIEWBOX_SIZE / 2 + Math.random() * 120 - 60,
        y: previous?.y ?? VIEWBOX_SIZE / 2 + Math.random() * 120 - 60,
      };
    });

    const simulation = forceSimulation(nextNodes)
      .force("charge", forceManyBody().strength(-160))
      .force(
        "link",
        forceLink<SimNode, SimLink>(simLinks)
          .id((node) => node.id)
          .distance((link) => 120 - Math.min(60, link.count * 6))
          .strength((link) => Math.min(0.6, 0.15 + link.count * 0.08))
      )
      .force("center", forceCenter(VIEWBOX_SIZE / 2, VIEWBOX_SIZE / 2))
      .alpha(0.9)
      .alphaTarget(0.08)
      .alphaDecay(0.02);

    simulation.on("tick", () => {
      if (rafRef.current !== null) {
        return;
      }
      rafRef.current = window.requestAnimationFrame(() => {
        nextNodes.forEach((node) => {
          if (typeof node.x === "number" && typeof node.y === "number") {
            positionsRef.current.set(node.id, { x: node.x, y: node.y });
          }
        });
        setSimNodes(nextNodes.map((node) => ({ ...node })));
        rafRef.current = null;
      });
    });

    return () => {
      simulation.stop();
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [nodes, simLinks]);

  const renderedNodes = simNodes.length ? simNodes : nodes;

  const linkOpacity = (count: number) => Math.min(0.6, 0.12 + count * 0.08);

  const handleKeyToggle = (event: React.KeyboardEvent<SVGGElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle(id);
    }
  };

  return (
    <section className="graph-panel">
      <div className="graph-header">
        <h2>Inconscient Réso•°</h2>
        <p className="helper">
          Le graphe est vivant. Appuie sur un nœud pour le faire résonner.
        </p>
      </div>
      <div className="graph-area">
        {nodes.length === 0 ? (
          <div className="empty">Aucun acteur encore. Dépose un premier fragment.</div>
        ) : (
          <svg className="graph-svg" viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}>
            <g className="graph-links">
              {simLinks.map((link) => {
                const source =
                  typeof link.source === "string"
                    ? renderedNodes.find((node) => node.id === link.source)
                    : link.source;
                const target =
                  typeof link.target === "string"
                    ? renderedNodes.find((node) => node.id === link.target)
                    : link.target;
                if (!source || !target) {
                  return null;
                }
                return (
                  <line
                    key={`${source.id}-${target.id}`}
                    x1={source.x ?? VIEWBOX_SIZE / 2}
                    y1={source.y ?? VIEWBOX_SIZE / 2}
                    x2={target.x ?? VIEWBOX_SIZE / 2}
                    y2={target.y ?? VIEWBOX_SIZE / 2}
                    stroke="rgba(47, 95, 75, 0.35)"
                    strokeWidth={Math.max(1, link.count * 0.8)}
                    opacity={linkOpacity(link.count)}
                  />
                );
              })}
            </g>
            <g className="graph-nodes">
              {renderedNodes.map((node) => {
                const isSelected = selection.includes(node.id);
                const radius = Math.min(38, 16 + node.count * 2.4);
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x ?? VIEWBOX_SIZE / 2}, ${
                      node.y ?? VIEWBOX_SIZE / 2
                    })`}
                    role="button"
                    tabIndex={0}
                    onClick={() => onToggle(node.id)}
                    onKeyDown={(event) => handleKeyToggle(event, node.id)}
                  >
                    <circle
                      r={radius}
                      fill={isSelected ? "#2f5f4b" : "#efe8dc"}
                      stroke={isSelected ? "#1e3b2d" : "#d5cdbf"}
                      strokeWidth={isSelected ? 3 : 1}
                      opacity={Math.min(1, 0.45 + node.count * 0.08)}
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={Math.min(22, 12 + node.count * 1.2)}
                      fill={isSelected ? "#fffaf3" : "#2a2a2a"}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        )}
      </div>
    </section>
  );
}
