import React from 'react';
import type { Levers, ScenarioStep } from '../lib/types';

interface ExplanationPanelProps {
    step?: ScenarioStep;
    stepIndex: number;
    totalSteps: number;
    scenarioMeta: { title: string; summary: string; keyQuestion: string; insights: string[] };
    leverDetails: Record<
        keyof Levers,
        { decidedBy: string; impact: string; description: string; title: string }
    >;
    levers: Levers;
}

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
    step,
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
                <p>Select a scenario to see how we narrate trade-offs at each ledger step.</p>
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

    return (
        <div className="space-y-5 text-sm text-slate-100">
            <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Scenario context</p>
                <h2 className="text-lg font-semibold text-white">{scenarioMeta.title}</h2>
                <p className="text-xs text-slate-400">{scenarioMeta.summary}</p>
                <p className="text-xs text-slate-500">Key question: {scenarioMeta.keyQuestion}</p>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Current step</p>
                    <p className="text-[11px] text-slate-500">
                        Step {stepIndex + 1} / {totalSteps}
                    </p>
                </div>
                <p className="text-base font-semibold text-white">{step.label}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{step.explanation}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                    {metricCards.map(card => (
                        <div key={card.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <p className="text-[11px] uppercase tracking-wide text-slate-400">{card.label}</p>
                            <p className="text-base font-semibold text-white">{card.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Lever guardrails</p>
                <div className="space-y-2">
                    {leverSelections.map(selection => (
                        <div key={selection.key} className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-white">{selection.detail.title}</p>
                                <span className="text-xs text-slate-400">Choice: {selection.value}</span>
                            </div>
                            <p className="text-[11px] text-slate-500">
                                Decided by {selection.detail.decidedBy}. Impact: {selection.detail.impact}.
                            </p>
                            <p className="text-xs text-slate-400 mt-1">{selection.detail.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Trade-offs to narrate</p>
                <ul className="mt-2 space-y-1 text-slate-200">
                    {scenarioMeta.insights.map(item => (
                        <li key={item}>• {item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ExplanationPanel;
