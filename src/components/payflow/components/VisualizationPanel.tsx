import React, { useEffect, useMemo, useState } from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';
import type { ScenarioStep } from '../lib/types';
import { cn } from '../lib/utils';

interface VisualizationPanelProps {
    steps: ScenarioStep[];
    currentStep: number;
    onStepChange: (step: number) => void;
    scenarioMeta: { title: string; summary: string; keyQuestion: string; insights: string[] };
}

type ActorKey = 'customer' | 'gateway' | 'merchant';

const formatCurrency = (value: number) => `₹${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const ACTOR_CONFIG: Record<
    ActorKey,
    { title: string; color: string; metrics: (keyof ScenarioStep['balances'])[] }
> = {
    customer: {
        title: 'Customer',
        color: '#0891b2',
        metrics: ['customerCash', 'customerHold'],
    },
    gateway: {
        title: 'Gateway',
        color: '#0f172a',
        metrics: ['gatewayCash', 'gatewayMerchantLiability', 'gatewayFees'],
    },
    merchant: {
        title: 'Merchant',
        color: '#0d9488',
        metrics: ['merchantCash'],
    },
};

const ACTOR_POSITIONS: Record<ActorKey, { x: number; y: number }> = {
    customer: { x: 0, y: 0 },
    gateway: { x: 350, y: 0 },
    merchant: { x: 700, y: 0 },
};

const deriveMovements = (current: ScenarioStep, previous: ScenarioStep | null) => {
    if (!previous) return [];

    const curr = current.balances;
    const prev = previous.balances;

    const movements: Array<{
        id: string;
        from: ActorKey;
        to: ActorKey;
        amount: number;
        label: string;
        tone: 'positive' | 'negative' | 'neutral';
    }> = [];

    const pushMovement = (
        from: ActorKey,
        to: ActorKey,
        amount: number,
        label: string,
        tone: 'positive' | 'negative' | 'neutral'
    ) => {
        if (amount <= 0) return;
        movements.push({
            id: `${from}-${to}-${label}-${current.day}`,
            from,
            to,
            amount,
            label,
            tone,
        });
    };

    const hold = curr.customerHold - prev.customerHold;
    if (hold > 0) {
        pushMovement('customer', 'gateway', hold, 'Auth hold', 'neutral');
    }

    const settlement = prev.customerCash - curr.customerCash;
    if (settlement > 0) {
        pushMovement('customer', 'gateway', settlement, 'Settlement', 'positive');
    }

    const refund = curr.customerCash - prev.customerCash;
    if (refund > 0) {
        pushMovement('gateway', 'customer', refund, 'Refund', 'negative');
    }

    const payout = curr.merchantCash - prev.merchantCash;
    if (payout > 0) {
        pushMovement('gateway', 'merchant', payout, 'Payout', 'positive');
    }

    const clawback = prev.merchantCash - curr.merchantCash;
    if (clawback > 0) {
        pushMovement('merchant', 'gateway', clawback, 'Clawback', 'negative');
    }

    return movements;
};

const computeImpactSummary = (steps: ScenarioStep[]) => {
    if (steps.length === 0) return [];
    const payoutStep = steps.find(step => step.label.toLowerCase().includes('payout')) ?? steps[steps.length - 1];
    const merchantCashDay = payoutStep?.day ?? 0;
    let minGatewayCash = steps[0]?.balances.gatewayCash ?? 0;
    let holdStart: number | null = null;
    let holdEnd: number | null = null;

    steps.forEach(step => {
        if (step.balances.gatewayCash < minGatewayCash) {
            minGatewayCash = step.balances.gatewayCash;
        }
        const hold = step.balances.customerHold;
        if (hold > 0 && holdStart === null) holdStart = step.day;
        if (hold === 0 && holdStart !== null && holdEnd === null) holdEnd = step.day;
    });

    const holdDuration = holdStart !== null && holdEnd !== null ? holdEnd - holdStart : 0;

    return [
        {
            label: 'Merchant cash available',
            value: merchantCashDay === 0 ? 'Day 0' : `Day ${merchantCashDay}`,
            helper: 'When the merchant actually receives funds.',
        },
        {
            label: 'Gateway peak exposure',
            value: minGatewayCash < 0 ? `₹${Math.abs(minGatewayCash)}` : '₹0',
            helper: 'Max cash the gateway fronts before settlement.',
        },
        {
            label: 'Customer hold duration',
            value: holdDuration > 0 ? `${holdDuration} day(s)` : 'Same day release',
            helper: 'How long the customer’s bank locks funds.',
        },
    ];
};

const buildFlowNodes = (step: ScenarioStep) => {
    return (Object.keys(ACTOR_CONFIG) as ActorKey[]).map(actor => {
        const config = ACTOR_CONFIG[actor];
        const metrics = config.metrics.map(metric => ({
            label: metric,
            value: step.balances[metric],
        }));

        return {
            id: actor,
            position: ACTOR_POSITIONS[actor],
            data: {
                label: (
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: config.color }}>
                            {config.title}
                        </p>
                        <ul className="mt-2 space-y-1 text-[11px] font-mono text-slate-600">
                            {metrics.map(metric => (
                                <li key={metric.label} className="flex justify-between">
                                    <span>{metric.label.replace(/([A-Z])/g, ' $1')}</span>
                                    <span>{metric.label.includes('Fees') ? metric.value : formatCurrency(metric.value)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ),
            },
            draggable: false,
            selectable: false,
        };
    });
};

const BASE_EDGES = [
    { id: 'base-customer-gateway', source: 'customer', target: 'gateway' },
    { id: 'base-gateway-merchant', source: 'gateway', target: 'merchant' },
];

const buildFlowEdges = (movements: ReturnType<typeof deriveMovements>) => {
    // 1. Create base persistent edges (always visible)
    const edges: any[] = BASE_EDGES.map(base => ({
        id: base.id,
        source: base.source,
        target: base.target,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#e2e8f0', strokeWidth: 2, strokeDasharray: '5,5' },
        zIndex: 0,
    }));

    // 2. Add active movement edges on top
    movements.forEach(movement => {
        const toneColor =
            movement.tone === 'positive'
                ? '#0ea5e9'
                : movement.tone === 'negative'
                    ? '#ef4444'
                    : '#94a3b8';

        edges.push({
            id: movement.id,
            source: movement.from,
            target: movement.to,
            type: 'smoothstep',
            animated: true,
            label: `${movement.label} · ${formatCurrency(movement.amount)}`,
            labelBgPadding: [8, 4],
            labelBgBorderRadius: 12,
            labelStyle: { fontSize: 11, fontWeight: 600, fill: toneColor },
            style: { stroke: toneColor, strokeWidth: 3, strokeDasharray: '0' },
            zIndex: 10,
        });
    });

    return edges;
};

const StepRail: React.FC<{
    steps: ScenarioStep[];
    currentStep: number;
    onStepChange: (step: number) => void;
}> = ({ steps, currentStep, onStepChange }) => (
    <div className="flex flex-wrap gap-2">
        {steps.map((step, index) => (
            <button
                key={`${step.label}-${index}`}
                type="button"
                onClick={() => onStepChange(index)}
                className={cn(
                    'rounded-full border px-3 py-1 text-xs transition',
                    index === currentStep ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600'
                )}
            >
                Day {step.day}: {step.label}
            </button>
        ))}
    </div>
);

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ steps, currentStep, onStepChange, scenarioMeta }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!isPlaying) return;
        if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
            return;
        }
        const handle = setTimeout(() => onStepChange(currentStep + 1), 2000);
        return () => clearTimeout(handle);
    }, [currentStep, isPlaying, onStepChange, steps.length]);

    const handlePlayToggle = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            if (currentStep >= steps.length - 1) {
                onStepChange(0);
            }
            setIsPlaying(true);
        }
    };

    const handleQuickAdvance = () => {
        if (currentStep < steps.length - 1) {
            onStepChange(currentStep + 1);
        } else {
            onStepChange(0);
        }
    };

    const impactSummary = useMemo(() => computeImpactSummary(steps), [steps]);

    if (steps.length === 0) {
        return (
            <div className="space-y-4 text-sm text-slate-600">
                <h2 className="text-lg font-semibold">Visualization</h2>
                <p>Select a scenario to light up the flow.</p>
            </div>
        );
    }

    const currentStepData = steps[currentStep];
    const previousStep = currentStep > 0 ? steps[currentStep - 1] : null;
    const nodes = buildFlowNodes(currentStepData);
    const edges = buildFlowEdges(deriveMovements(currentStepData, previousStep));

    return (
        <div className="space-y-8">
            {/* Hero Section: Visualization & Controls */}
            <div className="space-y-6">
                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                        <h2 className="font-semibold text-slate-900">Flow Visualization</h2>
                        <div className="flex items-center gap-3 text-xs">
                            <button
                                type="button"
                                onClick={handlePlayToggle}
                                className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 font-medium text-white transition hover:bg-slate-800"
                            >
                                {isPlaying ? (
                                    <>
                                        <span className="block h-2 w-2 animate-pulse rounded-full bg-red-500" />
                                        Pause
                                    </>
                                ) : (
                                    'Play Scenario'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={handleQuickAdvance}
                                className="rounded-full border border-slate-200 px-4 py-1.5 font-medium text-slate-600 hover:bg-slate-100"
                            >
                                {currentStep < steps.length - 1 ? 'Next Step' : 'Replay'}
                            </button>
                        </div>
                    </div>

                    <div className="relative h-[500px] w-full bg-slate-50/50">
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            nodesDraggable={false}
                            nodesConnectable={false}
                            fitView
                            fitViewOptions={{ padding: 0.2 }}
                            zoomOnScroll={false}
                            zoomOnPinch={false}
                            panOnDrag={false}
                            proOptions={{ hideAttribution: true }}
                        >
                            <Background gap={24} color="#cbd5e1" size={1} />
                        </ReactFlow>

                        <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium text-slate-500 shadow-sm backdrop-blur">
                            Step {currentStep + 1} of {steps.length}
                        </div>
                    </div>
                </div>

                <StepRail steps={steps} currentStep={currentStep} onStepChange={onStepChange} />
            </div>

            {/* Content Grid: Details & Metrics */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column: Scenario & Insights */}
                <div className="space-y-6 lg:col-span-2">
                    <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Current Scenario</p>
                            <h2 className="text-xl font-bold text-slate-900">{scenarioMeta.title}</h2>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600">{scenarioMeta.summary}</p>
                        <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                            <span className="font-semibold text-slate-900">Key Question: </span>
                            {scenarioMeta.keyQuestion}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-slate-900 p-6 text-white">
                        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Key Takeaways</h3>
                        <ul className="space-y-3">
                            {scenarioMeta.insights.map((lesson, i) => (
                                <li key={lesson} className="flex gap-3 text-sm text-slate-300">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white">
                                        {i + 1}
                                    </span>
                                    <span className="leading-relaxed">{lesson}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Impact Metrics */}
                <div className="space-y-3 lg:col-span-1">
                    <h3 className="px-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Impact Analysis</h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        {impactSummary.map(item => (
                            <div key={item.label} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm">
                                <div className="relative z-10">
                                    <p className="text-[10px] font-medium uppercase text-slate-500">{item.label}</p>
                                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{item.value}</p>
                                    <p className="mt-1 text-xs text-slate-400">{item.helper}</p>
                                </div>
                                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-slate-50 transition-transform group-hover:scale-150 group-hover:bg-blue-50" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualizationPanel;
