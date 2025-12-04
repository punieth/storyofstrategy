import React, { useEffect, useMemo, useState } from 'react';
import ControlsPanel from './components/ControlsPanel';
import VisualizationPanel from './components/VisualizationPanel';
import type { CoreScenarioType, Levers, ScenarioStep, ScenarioType } from './lib/types';
import { simulateScenario } from './lib/simulation';

type ScenarioMeta = {
    title: string;
    summary: string;
    keyQuestion: string;
    insights: string[];
};

const SUPPORTED_SCENARIOS: CoreScenarioType[] = ['normal_payment', 'refund', 'auth_capture_fail'];

const SCENARIO_LIBRARY: Record<CoreScenarioType, ScenarioMeta> = {
    normal_payment: {
        title: 'Normal Payment',
        summary: 'Happy-path auth → capture → settlement → payout for ₹100 with a ₹3 fee.',
        keyQuestion: 'When do funds actually land with the merchant?',
        insights: [
            'Merchant cash timing depends entirely on payout schedule.',
            'Gateway only fronts cash when instant payouts are enabled.',
            'Customer hold releases only after settlement completes.',
        ],
    },
    refund: {
        title: 'Refund',
        summary: 'A customer requests a full refund after the payment has settled.',
        keyQuestion: 'Who fronts liquidity when refunds are instant?',
        insights: [
            'Instant refund forces the gateway to use its own cash if payout already happened.',
            'Refund-after-payout delays money back to the customer but protects the gateway float.',
            'Fees are typically retained, so merchants lose the fee plus the revenue.',
        ],
    },
    auth_capture_fail: {
        title: 'Auth Success / Capture Failed',
        summary: 'Authorization succeeded but capture never happened (manual-capture miss).',
        keyQuestion: 'What risk does manual capture introduce?',
        insights: [
            'Customer funds can be locked for days even though the merchant never gets paid.',
            'Merchant loses the sale entirely when capture is missed.',
            'Auto-capture eliminates this failure mode but removes manual review time.',
        ],
    },
};

const LEVER_DETAILS: Record<
    keyof Levers,
    { decidedBy: string; impact: string; description: string; title: string }
> = {
    captureMode: {
        title: 'Capture Mode',
        decidedBy: 'Merchant Ops / Product',
        impact: 'Risk vs. fulfillment control',
        description:
            'Auto capture commits funds immediately. Manual capture lets merchants review but risks forgetting to capture before auth expiry.',
    },
    payoutSchedule: {
        title: 'Payout Schedule',
        decidedBy: 'Gateway Risk / Finance',
        impact: 'Merchant cashflow vs gateway exposure',
        description:
            'Shorter payout delays delight merchants but may require the gateway to front cash before receiving settlement.',
    },
    refundPolicy: {
        title: 'Refund Policy',
        decidedBy: 'Gateway Product / Risk',
        impact: 'Customer trust vs gateway float',
        description:
            'Instant refunds improve experience but can leave the gateway negative until it recovers money from the merchant.',
    },
};

const formatCurrency = (value: number | undefined) => {
    if (value === undefined || value === null) return '₹0';
    return `₹${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

const App = () => {
    const [levers, setLevers] = useState<Levers>({
        captureMode: 'auto',
        payoutSchedule: 'T+2',
        refundPolicy: 'instant',
    });
    const [activeScenario, setActiveScenario] = useState<CoreScenarioType>('normal_payment');
    const [steps, setSteps] = useState<ScenarioStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const result = simulateScenario(levers, activeScenario as ScenarioType);
        setSteps(result);
        setCurrentStep(0);
    }, [levers, activeScenario]);

    const handleLeversChange = (newLevers: Partial<Levers>) => {
        setLevers(prev => ({ ...prev, ...newLevers }));
    };

    const scenarioMeta = SCENARIO_LIBRARY[activeScenario];

    return (
        <div className="flex min-h-screen bg-slate-50/50 text-slate-900 font-sans">
            {/* Sidebar: Controls & Navigation */}
            <aside className="w-[440px] shrink-0 border-r border-slate-200 bg-white h-screen sticky top-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <div className="p-6 space-y-8">
                    <header className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-600" />
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Payflow</p>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Decision Lab</h1>
                        <p className="text-xs leading-relaxed text-slate-500">
                            Tweak levers to see how money and risk move through the system.
                        </p>
                    </header>

                    <div className="h-px w-full bg-slate-100" />

                    <ControlsPanel
                        levers={levers}
                        onLeverChange={handleLeversChange}
                        onScenarioChange={setActiveScenario}
                        activeScenario={activeScenario}
                        scenarioLibrary={SCENARIO_LIBRARY}
                        supportedScenarios={SUPPORTED_SCENARIOS}
                        leverDetails={LEVER_DETAILS}
                    />
                </div>
            </aside>

            {/* Main Content: Visualization */}
            <main className="flex-1 min-w-0">
                <div className="max-w-7xl mx-auto p-6 lg:p-10">
                    <VisualizationPanel
                        steps={steps}
                        currentStep={currentStep}
                        onStepChange={setCurrentStep}
                        scenarioMeta={scenarioMeta}
                    />
                </div>
            </main>
        </div>
    );
};

export default App;
