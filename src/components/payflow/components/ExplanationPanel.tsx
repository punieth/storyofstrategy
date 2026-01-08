import React, { useMemo } from 'react';
import type { Levers, ScenarioStep } from '../lib/types';

interface ExplanationPanelProps {
    step?: ScenarioStep;
    steps: ScenarioStep[];
    stepIndex: number;
    totalSteps: number;
    scenarioMeta: { title: string; summary: string; keyQuestion: string; insights: string[] };
    leverDetails: Record<
        keyof Levers,
        { decidedBy: string; impact: string; description: string; title: string }
    >;
    levers: Levers;
}

const computeImpactSummary = (steps: ScenarioStep[]) => {
    if (steps.length === 0) return [];
    
    // Find when merchant gets paid (payout step)
    const payoutStep = steps.find(step => step.label.toLowerCase().includes('payout')) ?? steps[steps.length - 1];
    const merchantCashDay = payoutStep?.day ?? 0;
    
    // Calculate max exposure
    let minGatewayCash = steps[0]?.balances.gatewayCash ?? 0;
    
    // Calculate hold duration
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
            label: 'Merchant Payout',
            value: merchantCashDay === 0 ? 'Day 0' : `Day ${merchantCashDay}`,
            helper: 'Funds received',
        },
        {
            label: 'Max Risk Exposure',
            value: minGatewayCash < 0 ? `₹${Math.abs(minGatewayCash)}` : '₹0',
            helper: 'Gateway capital used',
        },
        {
            label: 'Customer Hold',
            value: holdDuration > 0 ? `${holdDuration} days` : '0 days',
            helper: 'Funds locked',
        },
    ];
};

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
    step,
    steps,
    stepIndex,
    totalSteps,
    scenarioMeta,
    leverDetails,
    levers,
}) => {
    if (!step) {
        return (
            <div className="space-y-3 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Narrative</p>
                <p>Select a scenario to see how we narrate trade-offs.</p>
            </div>
        );
    }

    const leverSelections = (Object.keys(leverDetails) as (keyof Levers)[]).map(key => ({
        key,
        detail: leverDetails[key],
        value: levers[key],
    }));

    const metricCards = [
        { label: 'Customer hold', value: `₹${step.balances.customerHold}` },
        { label: 'Gateway liability', value: `₹${step.balances.gatewayMerchantLiability}` },
        { label: 'Gateway fees', value: `₹${step.balances.gatewayFees}` },
        { label: 'Merchant cash', value: `₹${step.balances.merchantCash}` },
    ];

    const summaryMetrics = useMemo(() => computeImpactSummary(steps), [steps]);

    return (
        <div className="space-y-8 text-sm text-slate-100">
            {/* Context Header */}
            <div className="space-y-2 border-b border-slate-800 pb-4">
                <p className="text-xs uppercase tracking-[0.3em] text-blue-400 font-bold">Scenario Narrative</p>
                <h2 className="text-xl font-bold text-white leading-tight">{scenarioMeta.title}</h2>
                <p className="text-sm text-slate-400 leading-relaxed">{scenarioMeta.summary}</p>
            </div>

            {/* Current Step Narrative */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                            {stepIndex + 1}
                        </span>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Current Step</p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">
                         Day {step.day}
                    </p>
                </div>
                
                <div className="rounded-xl bg-slate-800/50 p-4 border border-slate-700/50">
                    <p className="text-base font-medium text-white mb-2">{step.label}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{step.explanation}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {metricCards.map(card => (
                        <div key={card.label} className="rounded-lg bg-slate-800/30 p-2.5 border border-slate-800">
                            <p className="text-[10px] uppercase tracking-wide text-slate-500">{card.label}</p>
                            <p className="text-sm font-mono font-semibold text-white">{card.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Impact Summary (New Section) */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-bold">Total Impact</p>
                <div className="grid grid-cols-3 gap-2">
                    {summaryMetrics.map(metric => (
                        <div key={metric.label} className="text-center p-2 rounded-lg bg-emerald-900/10 border border-emerald-900/20">
                            <p className="text-lg font-bold text-emerald-400">{metric.value}</p>
                             <p className="text-[9px] uppercase tracking-wide text-emerald-600/80 leading-tight mt-1">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Configuration Context */}
            <div className="space-y-3 pt-4 border-t border-slate-800 opacity-60 hover:opacity-100 transition-opacity">
                 <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Active Configuration</p>
                 <div className="flex flex-wrap gap-2">
                    {leverSelections.map(selection => (
                        <span key={selection.key} className="inline-flex items-center rounded bg-slate-800 px-2 py-1 text-[10px] text-slate-400 border border-slate-700">
                            {selection.detail.title}: <span className="text-slate-200 ml-1">{selection.value}</span>
                        </span>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default ExplanationPanel;
