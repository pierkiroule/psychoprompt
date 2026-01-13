import { useMemo, useState, type ReactElement } from "react";
import { extractSignificantWords } from "./core/extractor";
import { addDeposit, listNodes, loadGraph, saveGraph, type GraphNode } from "./core/graph";
import { generatePrompt } from "./core/psychoprompt";
import { GraphView } from "./ui/GraphView";
import { Intro } from "./ui/Intro";
import { Journal } from "./ui/Journal";
import { PromptView, SelectionView } from "./ui/PromptView";
import "./styles.css";

type ViewState = "intro" | "journal" | "graph" | "selection" | "prompt";

type SelectionState = {
  present: string[];
  resource: string[];
};

const MAX_SELECTION = 2;

export function App(): ReactElement {
  const [view, setView] = useState<ViewState>("intro");
  const [graph, setGraph] = useState(() => loadGraph());
  const [selection, setSelection] = useState<SelectionState>({
    present: [],
    resource: [],
  });
  const [prompt, setPrompt] = useState("");

  const nodes = useMemo(() => listNodes(graph), [graph]);

  const labelTypeMap = useMemo(() => {
    return new Map(nodes.map((node) => [node.label, node.type]));
  }, [nodes]);

  const handleDeposit = (payload: { text: string; emojis: string[] }) => {
    const words = extractSignificantWords(payload.text);
    const nextGraph = addDeposit(graph, words, payload.emojis);
    setGraph(nextGraph);
    saveGraph(nextGraph);
    setView("graph");
  };

  const toggleSelection = (
    label: string,
    key: keyof SelectionState,
    otherKey: keyof SelectionState
  ) => {
    setSelection((prev) => {
      const current = prev[key];
      const other = prev[otherKey];
      if (current.includes(label)) {
        return { ...prev, [key]: current.filter((item) => item !== label) };
      }
      if (current.length >= MAX_SELECTION) {
        return prev;
      }
      return {
        ...prev,
        [key]: [...current, label],
        [otherKey]: other.filter((item) => item !== label),
      };
    });
  };

  const handleGenerate = () => {
    const nextPrompt = generatePrompt({
      present: selection.present,
      resource: selection.resource,
      memoryCount: graph.totalDeposits,
    });

    const words: string[] = [];
    const emojis: string[] = [];
    const all = [...selection.present, ...selection.resource];
    all.forEach((label) => {
      const type = labelTypeMap.get(label);
      if (type === "emoji") {
        emojis.push(label);
      } else {
        words.push(label);
      }
    });

    const nextGraph = addDeposit(graph, words, emojis);
    setGraph(nextGraph);
    saveGraph(nextGraph);
    setPrompt(nextPrompt);
    setView("prompt");
  };

  const handleReset = () => {
    setSelection({ present: [], resource: [] });
    setPrompt("");
    setView("journal");
  };

  const renderView = (state: ViewState): ReactElement => {
    switch (state) {
      case "intro":
        return <Intro onStart={() => setView("journal")} />;
      case "journal":
        return <Journal onSubmit={handleDeposit} />;
      case "graph":
        return <GraphView nodes={nodes} onContinue={() => setView("selection")} />;
      case "selection":
        return (
          <SelectionView
            nodes={nodes}
            present={selection.present}
            resource={selection.resource}
            onTogglePresent={(label) => toggleSelection(label, "present", "resource")}
            onToggleResource={(label) => toggleSelection(label, "resource", "present")}
            onGenerate={handleGenerate}
          />
        );
      case "prompt":
        return <PromptView prompt={prompt} onReset={handleReset} />;
      default:
        return <div className="panel">Vue indisponible. Reviens au début.</div>;
    }
  };

  return <main className="app">{renderView(view)}</main>;
}
