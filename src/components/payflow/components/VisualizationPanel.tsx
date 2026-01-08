import React, { useEffect } from 'react';
import ReactFlow, { Background, type NodeTypes, type EdgeTypes, useReactFlow, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import type { ScenarioStep } from '../lib/types';
import { cn } from '../lib/utils';
import EntityNode from './EntityNode';
import TransactionEdge from './TransactionEdge';

interface VisualizationPanelProps {
    steps: ScenarioStep[];
    currentStep: number;
    scenarioMeta: { title: string; summary: string; keyQuestion: string; insights: string[] };
    isConclusion?: boolean;
    onConclusionDismiss?: () => void;
    orientation?: 'horizontal' | 'vertical';
}

type ActorKey = 'customer' | 'gateway' | 'merchant';

const formatCurrency = (value: number) => `₹${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const nodeTypes: NodeTypes = {
    entity: EntityNode,
};

const edgeTypes: EdgeTypes = {
    transaction: TransactionEdge,
};

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

const ACTOR_POSITIONS_HORIZONTAL: Record<ActorKey, { x: number; y: number }> = {
    customer: { x: 0, y: 0 },
    gateway: { x: 350, y: 0 },
    merchant: { x: 700, y: 0 },
};

const ACTOR_POSITIONS_VERTICAL: Record<ActorKey, { x: number; y: number }> = {
    customer: { x: 0, y: 0 },
    gateway: { x: 0, y: 400 }, // Spaced out more for vertical scroll feel
    merchant: { x: 0, y: 800 },
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

const buildFlowNodes = (
    step: ScenarioStep, 
    movements: ReturnType<typeof deriveMovements>,
    orientation: 'horizontal' | 'vertical'
) => {
    const activeSources = new Set(movements.map(m => m.from));
    const activeTargets = new Set(movements.map(m => m.to));
    const positions = orientation === 'horizontal' ? ACTOR_POSITIONS_HORIZONTAL : ACTOR_POSITIONS_VERTICAL;

    return (Object.keys(ACTOR_CONFIG) as ActorKey[]).map(actor => {
        const config = ACTOR_CONFIG[actor];
        const metrics = config.metrics.map(metric => ({
            label: metric,
            value: step.balances[metric],
        }));

        return {
            id: actor,
            type: 'entity',
            position: positions[actor],
            data: {
                title: config.title,
                color: config.color,
                metrics: metrics,
                isSource: activeSources.has(actor),
                isTarget: activeTargets.has(actor),
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
    const edges: any[] = BASE_EDGES.map(base => ({
        id: base.id,
        source: base.source,
        target: base.target,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#e2e8f0', strokeWidth: 2, strokeDasharray: '5,5' },
        zIndex: 0,
    }));

    movements.forEach(movement => {
        edges.push({
            id: movement.id,
            source: movement.from,
            target: movement.to,
            type: 'transaction',
            animated: true,
            data: {
                label: movement.label,
                amount: formatCurrency(movement.amount),
                tone: movement.tone,
            },
            zIndex: 10,
        });
    });

    return edges;
};

// Internal component to use hooks
const VisualizationFlow = ({ 
    nodes, 
    edges, 
    orientation, 
    movements 
}: { 
    nodes: any[], 
    edges: any[], 
    orientation: 'horizontal' | 'vertical',
    movements: any[]
}) => {
    const { setCenter, fitView } = useReactFlow();

    useEffect(() => {
        if (orientation === 'vertical') {
            // Auto-Focus Logic for Mobile Stories
            // 1. Identify active nodes
            const activeNodeIds = new Set(movements.flatMap(m => [m.from, m.to]));
            
            // If no active movement (start state or rest), focus on Gateway (Middle) or fit all
            if (activeNodeIds.size === 0) {
                fitView({ duration: 800, padding: 0.2 });
                return;
            }

            // Calculate center of active nodes
            const positions = ACTOR_POSITIONS_VERTICAL;
            let totalY = 0;
            let count = 0;

            activeNodeIds.forEach(id => {
                if (positions[id as ActorKey]) {
                    totalY += positions[id as ActorKey].y;
                    count++;
                }
            });

            const centerY = totalY / count;
            
            // Pan to center (x=150 for node width center approx, y=centerY)
            setCenter(150, centerY + 100, { zoom: 0.85, duration: 1000 });

        } else {
             // Desktop: Just fit view smoothly
             fitView({ duration: 800, padding: 0.15 });
        }
    }, [movements, orientation, setCenter, fitView]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnDrag={true}
            proOptions={{ hideAttribution: true }}
        >
            <Background gap={24} color={orientation === 'vertical' ? "#334155" : "#cbd5e1"} size={1} />
        </ReactFlow>
    );
};

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ 
    steps, 
    currentStep, 
    scenarioMeta, 
    isConclusion = false,
    onConclusionDismiss,
    orientation = 'horizontal' 
}) => {
    
    if (steps.length === 0) {
        return (
             <div className="flex h-full items-center justify-center rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-sm text-slate-400">
                <p>Select a scenario to visualize the flow.</p>
            </div>
        );
    }

    const currentStepData = steps[currentStep];
    const previousStep = currentStep > 0 ? steps[currentStep - 1] : null;
    const movements = isConclusion ? [] : deriveMovements(currentStepData, previousStep);
    const nodes = buildFlowNodes(currentStepData, movements, orientation);
    const edges = buildFlowEdges(movements);

    return (
        <div className={cn(
            "h-full w-full overflow-hidden relative",
            orientation === 'horizontal' ? "rounded-[20px] border border-slate-200 bg-slate-50/50 shadow-inner" : ""
        )}>
            <ReactFlowProvider>
                 <VisualizationFlow 
                    nodes={nodes} 
                    edges={edges} 
                    orientation={orientation} 
                    movements={movements}
                 />
            </ReactFlowProvider>

            {/* Conclusion Overlay */}
            <div 
                onClick={onConclusionDismiss}
                className={cn(
                    "absolute inset-0 z-50 flex items-center justify-center p-8 transition-all duration-500 cursor-pointer",
                    isConclusion ? "bg-slate-900/40 backdrop-blur-[2px] opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <div 
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                        "max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 cursor-default",
                        isConclusion ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
                    )}
                >
                    <div className="bg-emerald-500 px-6 py-4 flex items-center justify-between">
                         <h3 className="text-white font-bold text-lg tracking-tight">Scenario Complete</h3>
                         <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white">✓</div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="space-y-1">
                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Outcome Analysis</p>
                            <p className="text-slate-900 font-medium leading-relaxed">
                                {scenarioMeta.summary}
                            </p>
                        </div>
                        
                        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-3">
                             {scenarioMeta.insights.slice(0, 2).map((insight, idx) => (
                                 <div key={idx} className="flex gap-3 items-start">
                                     <span className="shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold mt-0.5">i</span>
                                     <p className="text-sm text-slate-600 leading-snug">{insight}</p>
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualizationPanel;
