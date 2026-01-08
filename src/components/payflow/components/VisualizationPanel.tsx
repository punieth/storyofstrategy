import React, { useEffect, useMemo } from 'react';
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
    gateway: { x: 0, y: 250 }, // More breathing room for vertical flow
    merchant: { x: 0, y: 500 },
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
                orientation, // Pass orientation to node
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

const buildFlowEdges = (movements: ReturnType<typeof deriveMovements>, orientation: 'horizontal' | 'vertical') => {
    const isVertical = orientation === 'vertical';
    const edges: any[] = BASE_EDGES.map(base => {
        // Core Logic: Zig-Zag Routing for Vertical (Mobile)
        // Customer -> Gateway: uses Right side
        // Gateway -> Merchant: uses Left side
        const sourceHandle = !isVertical ? undefined : 
            base.id === 'base-customer-gateway' ? 'r' : 'sl';
        const targetHandle = !isVertical ? undefined : 
            base.id === 'base-customer-gateway' ? 'tr' : 'l';

        return {
            id: base.id,
            source: base.source,
            target: base.target,
            sourceHandle,
            targetHandle,
            type: 'smoothstep', // Revert to smooth curves
            animated: false,
            style: { stroke: '#e2e8f0', strokeWidth: 2, strokeDasharray: '5,5' },
            zIndex: 0,
        };
    });

    movements.forEach(movement => {
        const edgeId = `${movement.from}-${movement.to}`;
        const sourceHandle = !isVertical ? undefined : 
            movement.from === 'customer' ? 'r' : 'sl';
        const targetHandle = !isVertical ? undefined : 
            movement.to === 'gateway' ? 'tr' : 'l';

        edges.push({
            id: movement.id,
            source: movement.from,
            target: movement.to,
            sourceHandle,
            targetHandle,
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
            // Auto-Focus Logic for Mobile "Story" Mode
            const activeNodeIds = new Set(movements.flatMap(m => [m.from, m.to]));
            
            // If no active movement, show default view (Show all 3 ideally)
            if (activeNodeIds.size === 0) {
                 setCenter(110, 320, { zoom: 0.7, duration: 1200 }); // Center on Gateway
                 return;
            }

            // Calculate center of active nodes
            const positions = ACTOR_POSITIONS_VERTICAL;
            let totalY = 0;
            let count = 0;

            activeNodeIds.forEach(id => {
                const pos = positions[id as ActorKey];
                if (pos) {
                    totalY += pos.y;
                    count++;
                }
            });

            if (count === 0) return; // Safety check

            // "True" center of the active nodes
            const trueCenterY = totalY / count;
            
            // Adjust Offset: aim camera below content to shift content UP to clear bottom overlay
            // Standardized zoom for stability
            setCenter(110, trueCenterY + 100, { zoom: 0.7, duration: 1500 });

        } else {
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
            fitView={orientation === 'horizontal'}
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
    
    // Memoize derived data to prevent infinite loops / unstable renders
    const currentStepData = useMemo(() => steps[currentStep], [steps, currentStep]);
    const previousStep = useMemo(() => currentStep > 0 ? steps[currentStep - 1] : null, [steps, currentStep]);
    
    const movements = useMemo(() => {
         if (!currentStepData) return [];
         return isConclusion ? [] : deriveMovements(currentStepData, previousStep);
    }, [currentStepData, previousStep, isConclusion]);

    const nodes = useMemo(() => {
        if (!currentStepData) return [];
        return buildFlowNodes(currentStepData, movements, orientation);
    }, [currentStepData, movements, orientation]);

    const edges = useMemo(() => {
        return buildFlowEdges(movements, orientation);
    }, [movements, orientation]);

    if (steps.length === 0 || !currentStepData) {
        return (
             <div className="flex h-full items-center justify-center rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-sm text-slate-400">
                <p>Select a scenario to visualize the flow.</p>
            </div>
        );
    }

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

            {/* Conclusion Overlay - Hidden on Mobile to streamline story flow */}
            {orientation === 'horizontal' && (
                <div 
                    className={cn(
                        "absolute inset-x-0 bottom-0 z-50 p-4 transition-all duration-500",
                        isConclusion ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
                    )}
                >
                <div 
                    className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
                >
                    <div className="bg-emerald-500 px-5 py-3 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">✓</div>
                             <h3 className="text-white font-bold text-sm tracking-tight">Scenario Complete</h3>
                         </div>
                         <button 
                            onClick={onConclusionDismiss}
                            className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
                         >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                         </button>
                    </div>
                    <div className="p-4 space-y-3">
                        <p className="text-slate-900 text-sm font-medium leading-relaxed">
                            {scenarioMeta.summary}
                        </p>
                        
                        <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 space-y-2">
                             {scenarioMeta.insights.slice(0, 2).map((insight, idx) => (
                                 <div key={idx} className="flex gap-2 items-start">
                                     <span className="shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold mt-0.5">i</span>
                                     <p className="text-xs text-slate-600 leading-snug">{insight}</p>
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default VisualizationPanel;
