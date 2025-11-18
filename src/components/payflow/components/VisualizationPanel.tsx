import React from 'react';
import type { ScenarioStep } from '../lib/types';
import { cn } from '../lib/utils';

interface VisualizationPanelProps {
    steps: ScenarioStep[];
    currentStep: number;
    onStepChange: (step: number) => void;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ steps, currentStep, onStepChange }) => {
    if (steps.length === 0) {
        return (
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Visualization</h2>
                <div className="text-center text-gray-500 p-8 border-2 border-dashed rounded-lg">
                    <p>Run a scenario to see the results here.</p>
                </div>
            </div>
        );
    }

    const headers = [
        'Step',
        'Day',
        'Cust. Cash',
        'Cust. Hold',
        'GW Cash',
        'GW Liab.',
        'GW Fees',
        'Merch. Cash',
    ];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Ledger View</h2>

            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => onStepChange(currentStep - 1)}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm font-medium text-gray-700">
          Step {currentStep + 1} of {steps.length}
        </span>
                <button
                    onClick={() => onStepChange(currentStep + 1)}
                    disabled={currentStep === steps.length - 1}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="range"
                    min="0"
                    max={steps.length - 1}
                    value={currentStep}
                    onChange={(e) => onStepChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                    <tr>
                        {headers.map(header => (
                            <th key={header} scope="col" className="px-4 py-3">{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {steps.map((step, index) => (
                        <tr key={index} className={cn("border-b", { "bg-blue-100": index === currentStep, "bg-white": index !== currentStep })}>
                            <td className="px-4 py-3 font-medium text-gray-900">{step.label}</td>
                            <td className="px-4 py-3">{step.day}</td>
                            <td className="px-4 py-3">{step.balances.customerCash}</td>
                            <td className="px-4 py-3">{step.balances.customerHold}</td>
                            <td className="px-4 py-3">{step.balances.gatewayCash}</td>
                            <td className="px-4 py-3">{step.balances.gatewayMerchantLiability}</td>
                            <td className="px-4 py-3">{step.balances.gatewayFees}</td>
                            <td className="px-4 py-3">{step.balances.merchantCash}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VisualizationPanel;
