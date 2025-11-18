import React from 'react';
import type { ScenarioStep } from '../lib/types';

interface ExplanationPanelProps {
  step?: ScenarioStep;
}

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ step }) => {
  if (!step) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Explanation</h2>
        <div className="text-center text-gray-500 p-8 border-2 border-dashed rounded-lg">
          <p>Explanations for the running scenario will appear here.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Explanation</h2>
      <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800">{step.label}</h3>
            <p className="text-gray-600 text-sm">{step.explanation}</p>
          </div>
      </div>
    </div>
  );
};

export default ExplanationPanel;
