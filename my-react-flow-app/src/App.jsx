import React, { useCallback, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, MiniMap, Background } from 'reactflow';
import { DateRangeNode, TextUpdaterNode, CSVExportNode } from './nodes'; // Adjust the path as necessary


// import 'reactflow/dist/style.css';
import 'reactflow/dist/base.css';
import './index.css';
// import '../tailwind.config.js';

const nodeTypes = {
  dateRange: DateRangeNode,
  textUpdater: TextUpdaterNode,
  csvExport: CSVExportNode,
};

const createDateRangeNode = (id, x, y) => ({
  id: `dateRange-${id}`,
  type: 'dateRange',
  position: { x, y },
  data: { label: 'Date Range Node' }
});

// const createStringListNode = (id, x, y) => ({
//   id: `stringList-${id}`,
//   type: 'stringList',
//   position: { x, y },
//   data: { label: 'String List Node', items: ['Item 1', 'Item 2'] }
// });
const createTextUpdaterNode = (id, x, y) => ({
  id: `textUpdater-${id}`,
  type: 'textUpdater',
  position: { x, y },
  type: 'textUpdater',
  data: { value: 123 }
});

const createCSVExportNode = (id, x, y) => ({
  id: `csvExport-${id}`,
  type: 'csvExport',
  position: { x, y },
  data: { label: 'CSV Export Node' }
});


const initialNodes = [
  {
    id: 'horizontal-1',
    sourcePosition: 'right',
    type: 'dateRange',
    data: { label: 'Date Range Node' },
    position: { x: 0, y: 80 },
  },
  {
    id: 'horizontal-2',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'textUpdater',
    data: { label: 'String List Node', items: [] }, // Initial items array is empty
    position: { x: 250, y: 0 },
  },
  {
    id: 'horizontal-3',
    sourcePosition: 'right',
    targetPosition: 'left',
    type: 'csvExport',
    data: { label: 'CSV Export Node' },
    position: { x: 500, y: 0 },
  },
];

const initialEdges = [
  {
    id: 'horizontal-e1-2',
    source: 'horizontal-1',
    type: 'smoothstep',
    target: 'horizontal-2',
    animated: true,
  },
  {
    id: 'horizontal-e2-3',
    source: 'horizontal-2',
    type: 'smoothstep',
    target: 'horizontal-3',
    label: 'edge label',
  },
];

  


function MyFlowComponent() {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);
  const [elements, setElements] = useState(initialNodes);

  
  // const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));

  const addDateRangeNode = () => {
    const newNode = createDateRangeNode(Date.now(), 100, 100);
    setElements((els) => [...els, newNode]);
  };

  const addTextUpdaterNode = () => {
    const newNode = createTextUpdaterNode(Date.now(), 200, 200);
    setElements((els) => [...els, newNode]);
  };

  const addCSVExportNode = () => {
    const newNode = createCSVExportNode(Date.now(), 300, 300);
    setElements((els) => [...els, newNode]);
  };
  

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div >
        <button onClick={addDateRangeNode}>Add Date Range Node</button>
        <button onClick={addTextUpdaterNode}>Add String List Node</button>
        <button onClick={addCSVExportNode}>Add CSV Export Node</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default MyFlowComponent; // Ensure you're exporting the component to be used elsewhere.
