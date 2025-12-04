import React from 'react';
import type { CoreScenarioType, Levers } from '../lib/types';
import { cn } from '../lib/utils';

interface ControlsPanelProps {
    levers: Levers;
    onLeverChange: (levers: Partial<Levers>) => void;
    onScenarioChange: (scenarioType: CoreScenarioType) => void;
    activeScenario: CoreScenarioType;
    scenarioLibrary: Record<
        CoreScenarioType,
        { title: string; summary: string; keyQuestion: string; insights: string[] }
    >;
    supportedScenarios: CoreScenarioType[];
    leverDetails: Record<
        keyof Levers,
        { decidedBy: string; impact: string; description: string; title: string }
    >;
}

type LeverConfig = {
    key: keyof Levers;
    title: string;
    options: { value: Levers[keyof Levers]; label: string }[];
};

const leverConfigs: LeverConfig[] = [
    {
        key: 'captureMode',
        title: 'Capture mode',
        options: [
            { value: 'auto', label: 'Auto capture' },
            { value: 'manual', label: 'Manual capture' },
        ],
    },
    {
        key: 'payoutSchedule',
        title: 'Payout schedule',
        options: [
            { value: 'instant', label: 'Instant' },
            { value: 'T+2', label: 'T+2 days' },
            { value: 'T+7', label: 'T+7 days' },
        ],
    },
    {
        key: 'refundPolicy',
        title: 'Refund policy',
        options: [
            { value: 'instant', label: 'Instant refund' },
            { value: 'after_payout', label: 'After payout' },
        ],
    },
];

const ControlsPanel: React.FC<ControlsPanelProps> = ({
    levers,
    onLeverChange,
    onScenarioChange,
    activeScenario,
    scenarioLibrary,
    supportedScenarios,
    leverDetails,
}) => {
    const handleLeverSelect = (key: keyof Levers, value: Levers[keyof Levers]) => {
        onLeverChange({ [key]: value });
    };

    return (
        <div className="space-y-8 text-sm text-slate-700">
            {/* Scenario Selector */}
            <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Select Scenario</p>
                <div className="flex flex-col gap-2">
                    {supportedScenarios.map(option => {
                        const meta = scenarioLibrary[option];
                        const isActive = option === activeScenario;
                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => onScenarioChange(option)}
                                className={cn(
                                    'group relative flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all',
                                    isActive
                                        ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                                )}
                            >
                                <span className={cn('font-medium', isActive ? 'text-blue-700' : 'text-slate-700')}>
                                    {meta.title}
                                </span>
                                {isActive && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="h-px w-full bg-slate-100" />

            {/* Levers */}
            <div className="space-y-6">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Configuration</p>
                <div className="space-y-5">
                    {leverConfigs.map(config => {
                        const meta = leverDetails[config.key];
                        return (
                            <div key={config.key} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-700">{config.title}</span>
                                    <span className="text-[10px] text-slate-400">{meta.decidedBy}</span>
                                </div>
                                <div className="flex rounded-lg bg-slate-100 p-1">
                                    {config.options.map(option => {
                                        const isSelected = levers[config.key] === option.value;
                                        return (
                                            <button
                                                key={option.value as string}
                                                type="button"
                                                onClick={() => handleLeverSelect(config.key, option.value)}
                                                className={cn(
                                                    'flex-1 rounded-md py-1.5 text-[11px] font-medium transition-all',
                                                    isSelected
                                                        ? 'bg-white text-slate-900 shadow-sm'
                                                        : 'text-slate-500 hover:text-slate-700'
                                                )}
                                            >
                                                {option.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-[10px] leading-relaxed text-slate-500">{meta.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ControlsPanel;
