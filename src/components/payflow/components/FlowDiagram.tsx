import React from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const FlowDiagram = ({ nodes, edges }) => {
  return (
    <div style={{ height: '400px', width: '100%', border: '1px solid #ccc', borderRadius: '8px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
