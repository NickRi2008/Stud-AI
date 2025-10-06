// app/visualizzatore-json/page.tsx
'use client';

import { useState } from 'react';
import { Canvas, Node, Edge } from 'reaflow';

// Semplice parser per trasformare un oggetto JSON in nodi e archi per Reaflow
const parseJsonToGraph = (json: any, parentId?: string, key?: string) => {
  let nodes: any[] = [];
  let edges: any[] = [];
  const id = parentId ? `${parentId}-${key}` : 'root';

  if (Array.isArray(json)) {
    nodes.push({ id, text: `[${key || 'root'}]` });
    json.forEach((item, index) => {
      const { nodes: childNodes, edges: childEdges } = parseJsonToGraph(item, id, String(index));
      nodes = [...nodes, ...childNodes];
      edges = [...edges, ...childEdges];
      edges.push({ id: `${id}-${index}`, from: id, to: childNodes[0].id });
    });
  } else if (typeof json === 'object' && json !== null) {
    nodes.push({ id, text: `{${key || 'root'}}` });
    Object.entries(json).forEach(([k, v]) => {
      const { nodes: childNodes, edges: childEdges } = parseJsonToGraph(v, id, k);
      nodes = [...nodes, ...childNodes];
      edges = [...edges, ...childEdges];
      edges.push({ id: `${id}-${k}`, from: id, to: childNodes[0].id });
    });
  } else {
    nodes.push({ id, text: `${key}: ${String(json)}` });
  }

  return { nodes, edges };
};

export default function JsonVisualizerPage() {
  const [graphData, setGraphData] = useState<{ nodes: any[], edges: any[] }>({ nodes: [], edges: [] });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          const { nodes, edges } = parseJsonToGraph(json);
          setGraphData({ nodes, edges });
        } catch (error) {
          alert('File JSON non valido!');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800">Visualizzatore JSON</h1>
      <p className="mt-2 text-gray-600">Carica un file JSON per visualizzarlo come un grafo interattivo.</p>
      
      <div className="mt-4">
        <label className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-700">
          Carica File JSON Locale
          <input type="file" accept=".json" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      <div className="flex-1 mt-8 border rounded-lg bg-white overflow-hidden">
        {graphData.nodes.length > 0 ? (
          <Canvas
            nodes={graphData.nodes}
            edges={graphData.edges}
            direction="RIGHT"
            fit
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Nessun dato da visualizzare. Carica un file JSON.
          </div>
        )}
      </div>
    </div>
  );
}
