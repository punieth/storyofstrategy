import React, { useEffect, useState } from 'react';
import ControlsPanel from './components/ControlsPanel';
import VisualizationPanel from './components/VisualizationPanel';
import ExplanationPanel from './components/ExplanationPanel';
import Timeline from './components/Timeline';
import MobileControls from './components/MobileControls';
import MobileStoryLayout from './components/MobileStoryLayout';
import type { CoreScenarioType, Levers, ScenarioStep, ScenarioType } from './lib/types';
import { simulateScenario } from './lib/simulation';
import { cn } from './lib/utils';

// ... (Scenario Types & Data - No Changes) ...
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

const App = () => {
    const [levers, setLevers] = useState<Levers>({
        captureMode: 'auto',
        payoutSchedule: 'T+2',
        refundPolicy: 'instant',
    });
    const [activeScenario, setActiveScenario] = useState<CoreScenarioType>('normal_payment');
    
    // Initialize steps synchronously to prevent empty-render crashes
    const [steps, setSteps] = useState<ScenarioStep[]>(() => 
        simulateScenario(
            { captureMode: 'auto', payoutSchedule: 'T+2', refundPolicy: 'instant' },
            'normal_payment'
        )
    );
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isConclusion, setIsConclusion] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    // Initial Mobile Check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Resimulate when inputs change
    useEffect(() => {
        const result = simulateScenario(levers, activeScenario as ScenarioType);
        setSteps(result);
        setCurrentStep(0);
        setIsPlaying(false);
        setIsConclusion(false);
    }, [levers, activeScenario]);

    // Playback Logic
    useEffect(() => {
        if (!isPlaying) return;
        
        // If we are at the last step, wait one beat then finish
        if (currentStep >= steps.length - 1) {
            const finishTimer = setTimeout(() => {
                setIsPlaying(false);
                setIsConclusion(true);
            }, 2000); // Wait 2s on the final step before showing conclusion
            return () => clearTimeout(finishTimer);
        }

        const timer = setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
        }, 1500); // 1.5s per step

        return () => clearTimeout(timer);
    }, [isPlaying, currentStep, steps.length]);

    const handleLeversChange = (newLevers: Partial<Levers>) => {
        setLevers(prev => ({ ...prev, ...newLevers }));
    };

    const togglePlay = () => {
        if (isConclusion || currentStep >= steps.length - 1) {
            setCurrentStep(0);
            setIsConclusion(false);
            setIsPlaying(true);
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const scenarioMeta = SCENARIO_LIBRARY[activeScenario];
    const activeStepData = steps[currentStep];

    // Mobile "Stories" Mode
    if (isMobile) {
        return (
            <MobileStoryLayout
                currentStep={currentStep}
                totalSteps={steps.length}
                scenarioTitle={scenarioMeta.title}
                stepData={activeStepData || steps[0]}
                onNext={handleNext}
                onPrev={handlePrev}
                onTogglePlay={togglePlay}
                isPlaying={isPlaying}
                levers={levers}
                onLeverChange={handleLeversChange}
                onScenarioChange={setActiveScenario}
                activeScenario={activeScenario}
                scenarioLibrary={SCENARIO_LIBRARY}
                supportedScenarios={SUPPORTED_SCENARIOS}
                leverDetails={LEVER_DETAILS}
            >
                <VisualizationPanel
                    steps={steps}
                    currentStep={currentStep}
                    scenarioMeta={scenarioMeta}
                    isConclusion={isConclusion}
                    onConclusionDismiss={() => setIsConclusion(false)}
                    orientation="vertical"
                />
            </MobileStoryLayout>
        );
    }

    // Desktop "Workbench" Mode
    return (
        <div className="flex h-screen w-full flex-col bg-slate-50 text-slate-900 font-sans overflow-hidden">
            {/* Header */}
            <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-blue-600 shadow-sm" />
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-slate-900">Payflow Decision Lab</h1>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400">Prototype v2.0</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2">
                        <a href="https://twitter.com/punith" target="_blank" rel="noreferrer" className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </a>
                        <a href="https://linkedin.com/in/punith" target="_blank" rel="noreferrer" className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                    </div>
                    <button 
                        onClick={togglePlay}
                        className={cn(
                            "flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all",
                            isPlaying 
                                ? "bg-red-100 text-red-600 hover:bg-red-200" 
                                : isConclusion 
                                    ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl"
                                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl"
                        )}
                    >
                        {isPlaying ? 'Pause Simulation' : isConclusion ? '↻ Replay Scenario' : '▶ Run Simulation'}
                    </button>
                </div>
            </header>

            {/* Main Workbench Layout */}
            <main className="flex flex-1 overflow-hidden">
                {/* Column 1: Setup & Controls (Left Sidebar) */}
                <aside className="w-[340px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-6 pb-20">
                    <ControlsPanel
                        levers={levers}
                        onLeverChange={handleLeversChange}
                        onScenarioChange={setActiveScenario}
                        activeScenario={activeScenario}
                        scenarioLibrary={SCENARIO_LIBRARY}
                        supportedScenarios={SUPPORTED_SCENARIOS}
                        leverDetails={LEVER_DETAILS}
                    />
                </aside>

                {/* Column 2: The Stage (Visualization) */}
                <section className="flex flex-1 flex-col relative bg-slate-50/50">
                    {/* Timeline Interaction Strip */}
                    <div className="shrink-0 border-b border-slate-200 bg-white/80 px-8 py-4 backdrop-blur-sm z-10 transition-opacity duration-300" style={{ opacity: isConclusion ? 0.5 : 1 }}>
                        <Timeline 
                            steps={steps} 
                            currentStep={currentStep} 
                            onStepChange={(step) => {
                                setCurrentStep(step);
                                setIsPlaying(false);
                                setIsConclusion(false);
                            }} 
                        />
                    </div>
                    
                    {/* Flow Diagram */}
                    <div className="flex-1 p-8 overflow-hidden">
                         <div className="h-full w-full rounded-[24px] border-2 border-slate-200 bg-white shadow-sm overflow-hidden relative">
                             {/* Floating Scenario Label */}
                             <div className="absolute top-6 left-6 z-20 pointer-events-none transition-opacity duration-500" style={{ opacity: isConclusion ? 0 : 1 }}>
                                 <span className="inline-flex items-center rounded-lg bg-slate-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-md">
                                     {scenarioMeta.title}
                                 </span>
                             </div>

                             <VisualizationPanel
                                steps={steps}
                                currentStep={currentStep}
                                scenarioMeta={scenarioMeta}
                                isConclusion={isConclusion}
                                onConclusionDismiss={() => setIsConclusion(false)}
                            />
                         </div>
                    </div>
                </section>

                {/* Column 3: The Narrative (Right Sidebar) */}
                <aside className="w-[400px] shrink-0 overflow-y-auto border-l border-slate-200 bg-slate-900 text-slate-50 p-6 pb-20 shadow-2xl z-20">
                    <ExplanationPanel
                        step={activeStepData}
                        steps={steps}
                        stepIndex={currentStep}
                        totalSteps={steps.length}
                        scenarioMeta={scenarioMeta}
                        leverDetails={LEVER_DETAILS}
                        levers={levers}
                    />
                </aside>
            </main>
        </div>
    );
};

export default App;
