import { useMemo, useState, type ReactElement } from "react";
import { extractSignificantWords } from "./core/extractor";
import { addDeposit, listEdges, listNodes, loadGraph, saveGraph } from "./core/graph";
import { generatePrompt } from "./core/psychoprompt";
import { GraphView } from "./ui/GraphView";
import { Intro } from "./ui/Intro";
import { Journal } from "./ui/Journal";
import { PromptView } from "./ui/PromptView";
import "./styles.css";

type ViewState = "intro" | "main";

const MAX_SELECTION = 5;
const MIN_SELECTION = 2;

export function App(): ReactElement {
  const [view, setView] = useState<ViewState>("intro");
  const [graph, setGraph] = useState(() => loadGraph());
  const [selection, setSelection] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");

  const nodes = useMemo(() => listNodes(graph), [graph]);
  const edges = useMemo(() => listEdges(graph), [graph]);

  const nodeMap = useMemo(() => {
    return new Map(nodes.map((node) => [node.id, node]));
  }, [nodes]);

  const handleDeposit = (payload: { text: string; emojis: string[] }) => {
    const words = extractSignificantWords(payload.text);
    const nextGraph = addDeposit(graph, words, payload.emojis);
    setGraph(nextGraph);
    saveGraph(nextGraph);
  };

  const toggleSelection = (id: string) => {
    setSelection((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= MAX_SELECTION) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleGenerate = () => {
    if (selection.length < MIN_SELECTION) {
      return;
    }
    const selectedNodes = selection
      .map((id) => nodeMap.get(id))
      .filter((node) => node !== undefined);
    const selectedLabels = selectedNodes.map((node) => node.label);
    const selectedSet = new Set(selection);
    const relations = edges
      .filter((edge) => selectedSet.has(edge.a) && selectedSet.has(edge.b))
      .map((edge) => {
        const source = nodeMap.get(edge.a)?.label ?? edge.a;
        const target = nodeMap.get(edge.b)?.label ?? edge.b;
        return `${source} ↔ ${target} (x${edge.count})`;
      });

    const nextPrompt = generatePrompt({
      selected: selectedLabels,
      relations,
      memoryCount: graph.totalDeposits,
    });

    const words: string[] = [];
    const emojis: string[] = [];
    selectedNodes.forEach((node) => {
      const type = node.type;
      if (type === "emoji") {
        emojis.push(node.label);
      } else {
        words.push(node.label);
      }
    });

    const nextGraph = addDeposit(graph, words, emojis);
    setGraph(nextGraph);
    saveGraph(nextGraph);
    setPrompt(nextPrompt);
  };

  const handleReset = () => {
    setSelection([]);
    setPrompt("");
  };

  const renderView = (state: ViewState): ReactElement => {
    switch (state) {
      case "intro":
        return <Intro onStart={() => setView("main")} />;
      case "main":
        return (
          <section className="graph-layout">
            <GraphView
              nodes={nodes}
              edges={edges}
              selection={selection}
              onToggle={toggleSelection}
            />
            <section className="graph-controls">
              <div className="selection-status">
                <h3>Sélection symbolique</h3>
                <p className="helper">Sélectionne ce qui résonne pour toi maintenant.</p>
                <p className="helper">
                  {selection.length} sélectionné{selection.length > 1 ? "s" : ""} (entre{" "}
                  {MIN_SELECTION} et {MAX_SELECTION}).
                </p>
                <div className="button-row">
                  <button
                    className="primary"
                    type="button"
                    onClick={handleGenerate}
                    disabled={selection.length < MIN_SELECTION}
                  >
                    Générer le psychoprompt
                  </button>
                  <button type="button" className="secondary" onClick={handleReset}>
                    Effacer la sélection
                  </button>
                </div>
              </div>
              <Journal onSubmit={handleDeposit} />
              {prompt ? <PromptView prompt={prompt} onClear={() => setPrompt("")} /> : null}
            </section>
          </section>
        );
      default:
        return <div className="panel">Vue indisponible. Reviens au début.</div>;
    }
  };

  return <main className="app">{renderView(view)}</main>;
}
