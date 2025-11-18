import React from 'react';
import type { ScenarioStep } from '../lib/types';
import { cn } from '../lib/utils';
import FlowDiagram from './FlowDiagram';
import { MarkerType } from 'reactflow';

interface VisualizationPanelProps {
    steps: ScenarioStep[];
    currentStep: number;
    onStepChange: (step: number) => void;
}

const generateFlowData = (currentStep: ScenarioStep, previousStep: ScenarioStep | null, allSteps: ScenarioStep[]) => {
    if (!currentStep) return { nodes: [], edges: [] };

    const { balances: curr, label } = currentStep;
    const isAuthStep = label.includes('Auth');
    const isCaptureStep = label.includes('Capture');
    const isPayoutStep = label.includes('Payout');
    const isSettlementStep = label.includes('Settlement');
    const isRefundStep = label.includes('Refund');
    const isChargebackStep = label.includes('Chargeback') || label.includes('Dispute');

    const customerActive = isAuthStep || isSettlementStep || isRefundStep || isChargebackStep;
    const gatewayActive = isAuthStep || isCaptureStep || isPayoutStep || isSettlementStep || isRefundStep || isChargebackStep;
    const merchantActive = isCaptureStep || isPayoutStep || isRefundStep || isChargebackStep;
    const highlightStyle = (active: boolean) => (
        active ? { borderColor: '#2563eb', borderWidth: 2, boxShadow: '0 0 10px #2563eb' } : {}
    );

    const nodes = [
        {
            id: 'customer',
            type: 'default',
            data: { label: (
                <div className="text-center">
                    <div className="font-bold mb-2">Customer</div>
                    <div className="text-lg font-mono bg-white/50 rounded p-1">Cash: ${curr.customerCash}</div>
                    {curr.customerHold > 0 && (
                        <div className="mt-2 text-sm bg-orange-100 border border-orange-300 rounded p-1">
                            🔒 Held: ${curr.customerHold}
                        </div>
                    )}
                </div>
            )},
            position: { x: 50, y: 150 },
            style: { width: 180, backgroundColor: '#e0f2fe', ...highlightStyle(customerActive), padding: 10 },
        },
        {
            id: 'gateway',
            type: 'default',
            data: { label: (
                <div className="text-center">
                    <div className="font-bold mb-1">Gateway {isCaptureStep && curr.gatewayMerchantLiability > 0 && '🧾'}</div>
                    <div className="text-lg font-mono bg-white/50 rounded p-1">Cash: ${curr.gatewayCash}</div>
                    {curr.gatewayMerchantLiability > 0 && (
                         <div className="mt-2 text-sm bg-purple-100 border border-purple-300 rounded p-1">
                            🧾 Owed: ${curr.gatewayMerchantLiability}
                        </div>
                    )}
                    {curr.gatewayFees > 0 && (
                        <div className="mt-2 text-sm bg-green-200 border border-green-400 rounded p-1">
                            💰 Fees: ${curr.gatewayFees}
                        </div>
                    )}
                </div>
            )},
            position: { x: 350, y: 150 },
            style: { width: 180, backgroundColor: '#d1fae5', ...highlightStyle(gatewayActive), padding: 10 },
        },
        {
            id: 'merchant',
            type: 'default',
            data: { label: (
                <div className="text-center">
                    <div className="font-bold mb-1">Merchant</div>
                    <div className="text-lg font-mono bg-white/50 rounded p-1">Cash: ${curr.merchantCash}</div>
                </div>
            )},
            position: { x: 650, y: 150 },
            style: { width: 180, backgroundColor: '#fee2e2', ...highlightStyle(merchantActive), padding: 10 },
        },
    ];

    const edges = [];
    if (!previousStep) return { nodes, edges };

    const prev = previousStep.balances;

    const defaultEdgeStyle = {
        animated: true,
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        style: { strokeWidth: 2 },
    };

    // Customer -> Gateway (Authorization)
    if (isAuthStep && curr.customerHold > 0 && (prev.customerHold === 0 || !prev.customerHold)) {
        edges.push({
            id: 'c-g-auth',
            source: 'customer',
            target: 'gateway',
            label: `Authorize: $${curr.customerHold.toFixed(0)}`,
            ...defaultEdgeStyle,
            style: { ...defaultEdgeStyle.style, strokeDasharray: '5 5', stroke: '#6b7280' },
        });
    }

    // Customer -> Gateway (Settlement)
    const customerToGatewayAmount = prev.customerCash - curr.customerCash;
    if (customerToGatewayAmount > 0 && isSettlementStep) {
        edges.push({ id: 'c-g', source: 'customer', target: 'gateway', label: `Settlement: $${customerToGatewayAmount.toFixed(0)}`, ...defaultEdgeStyle });
    }

    // Gateway -> Merchant (Payout)
    const gatewayToMerchantAmount = curr.merchantCash - prev.merchantCash;
    if (gatewayToMerchantAmount > 0 && isPayoutStep) {
        edges.push({ id: 'g-m', source: 'gateway', target: 'merchant', label: `Payout: $${gatewayToMerchantAmount.toFixed(0)}`, ...defaultEdgeStyle });
    }
    
    // Gateway -> Customer (Refund)
    const gatewayToCustomerAmount = curr.customerCash - prev.customerCash;
    if (gatewayToCustomerAmount > 0 && (isRefundStep || isChargebackStep)) {
        const label = isChargebackStep ? 'Chargeback Reversal' : 'Refund';
        edges.push({ id: 'g-c', source: 'gateway', target: 'customer', label: `${label}: $${gatewayToCustomerAmount.toFixed(0)}`, ...defaultEdgeStyle, style: { ...defaultEdgeStyle.style, stroke: '#ef4444' } });
    }

    // Merchant -> Gateway (Refund/Chargeback Clawback)
    const merchantToGatewayAmount = prev.merchantCash - curr.merchantCash;
    if (merchantToGatewayAmount > 0 && (isRefundStep || isChargebackStep)) {
         edges.push({ id: 'm-g', source: 'merchant', target: 'gateway', label: `Clawback: $${merchantToGatewayAmount.toFixed(0)}`, ...defaultEdgeStyle, style: { ...defaultEdgeStyle.style, stroke: '#ef4444' } });
    }

    return { nodes, edges };
};


const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ steps, currentStep, onStepChange }) => {
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

    const currentStepData = steps[currentStep];
    const previousStepData = currentStep > 0 ? steps[currentStep - 1] : null;
    const { nodes, edges } = generateFlowData(currentStepData, previousStepData, steps);

    return (
        <div>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-700">Flow Diagram</h2>
                <div className="inline-block bg-gray-800 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
                    Status: <span className="font-bold">{currentStepData.label}</span>
                </div>
            </div>
            <div className="mb-8">
                <FlowDiagram nodes={nodes} edges={edges} />
            </div>

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
                    {steps.map((step, index) => {
                        const prevBalances = index > 0 ? steps[index - 1].balances : null;

                        const getCellClass = (currentValue: number, previousValue: number | undefined | null) => {
                            if (previousValue === null || previousValue === undefined || currentValue === previousValue) {
                                return "px-4 py-3";
                            }
                            if (currentValue > previousValue) {
                                return "px-4 py-3 bg-green-100 font-medium text-green-800"; // Increase
                            }
                            if (currentValue < previousValue) {
                                return "px-4 py-3 bg-red-100 font-medium text-red-800"; // Decrease
                            }
                            return "px-4 py-3";
                        };

                        return (
                            <tr key={index} className={cn("border-b cursor-pointer hover:bg-gray-50", { "bg-blue-100": index === currentStep, "bg-white": index !== currentStep })} onClick={() => onStepChange(index)}>
                                <td className="px-4 py-3 font-medium text-gray-900">{step.label}</td>
                                <td className="px-4 py-3">{step.day}</td>
                                <td className={getCellClass(step.balances.customerCash, prevBalances?.customerCash)}>{step.balances.customerCash}</td>
                                <td className={getCellClass(step.balances.customerHold, prevBalances?.customerHold)}>{step.balances.customerHold}</td>
                                <td className={getCellClass(step.balances.gatewayCash, prevBalances?.gatewayCash)}>{step.balances.gatewayCash}</td>
                                <td className={getCellClass(step.balances.gatewayMerchantLiability, prevBalances?.gatewayMerchantLiability)}>{step.balances.gatewayMerchantLiability}</td>
                                <td className={getCellClass(step.balances.gatewayFees, prevBalances?.gatewayFees)}>{step.balances.gatewayFees}</td>
                                <td className={getCellClass(step.balances.merchantCash, prevBalances?.merchantCash)}>{step.balances.merchantCash}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VisualizationPanel;
