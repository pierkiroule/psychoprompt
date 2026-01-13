export type NodeType = "word" | "emoji";

export type GraphNode = {
  id: string;
  label: string;
  type: NodeType;
  count: number;
};

export type GraphEdge = {
  key: string;
  a: string;
  b: string;
  count: number;
};

export type GraphState = {
  nodes: Record<string, GraphNode>;
  edges: Record<string, GraphEdge>;
  totalDeposits: number;
};

const STORAGE_KEY = "psychoprompt.graph.v1";

function normalizeLabel(label: string): string {
  return label.trim();
}

function edgeKey(a: string, b: string): string {
  const sorted = [a, b].sort();
  return `${sorted[0]}::${sorted[1]}`;
}

export function createEmptyGraph(): GraphState {
  return {
    nodes: {},
    edges: {},
    totalDeposits: 0,
  };
}

export function loadGraph(): GraphState {
  if (typeof window === "undefined") {
    return createEmptyGraph();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createEmptyGraph();
    }
    const parsed = JSON.parse(raw) as GraphState;
    if (!parsed || typeof parsed !== "object") {
      return createEmptyGraph();
    }
    return {
      nodes: parsed.nodes ?? {},
      edges: parsed.edges ?? {},
      totalDeposits: parsed.totalDeposits ?? 0,
    };
  } catch {
    return createEmptyGraph();
  }
}

export function saveGraph(state: GraphState): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage failures
  }
}

export function addDeposit(
  state: GraphState,
  words: string[],
  emojis: string[]
): GraphState {
  const next = {
    nodes: { ...state.nodes },
    edges: { ...state.edges },
    totalDeposits: state.totalDeposits + 1,
  } satisfies GraphState;

  const labels = [
    ...words.map((word) => ({ label: normalizeLabel(word), type: "word" as const })),
    ...emojis.map((emoji) => ({ label: normalizeLabel(emoji), type: "emoji" as const })),
  ].filter((item) => item.label.length > 0);

  labels.forEach((item) => {
    const id = `${item.type}:${item.label}`;
    const current = next.nodes[id];
    next.nodes[id] = {
      id,
      label: item.label,
      type: item.type,
      count: current ? current.count + 1 : 1,
    };
  });

  for (let i = 0; i < labels.length; i += 1) {
    for (let j = i + 1; j < labels.length; j += 1) {
      const a = `${labels[i].type}:${labels[i].label}`;
      const b = `${labels[j].type}:${labels[j].label}`;
      const key = edgeKey(a, b);
      const current = next.edges[key];
      next.edges[key] = {
        key,
        a,
        b,
        count: current ? current.count + 1 : 1,
      };
    }
  }

  return next;
}

export function listNodes(state: GraphState): GraphNode[] {
  return Object.values(state.nodes).sort((a, b) => b.count - a.count);
}
