import React from 'react';
import { cn } from '../lib/utils';
import type { ScenarioStep } from '../lib/types';
import MobileControls from './MobileControls';

interface MobileStoryLayoutProps {
    children: React.ReactNode; // The VisualizationPanel
    currentStep: number;
    totalSteps: number;
    scenarioTitle: string;
    stepData: ScenarioStep;
    onNext: () => void;
    onPrev: () => void;
    onTogglePlay: () => void;
    isPlaying: boolean;
    levers: any;
    onLeverChange: any;
    onScenarioChange: any;
    activeScenario: any;
    scenarioLibrary: any;
    supportedScenarios: any;
    leverDetails: any;
}

const MobileStoryLayout: React.FC<MobileStoryLayoutProps> = ({
    children,
    currentStep,
    totalSteps,
    scenarioTitle,
    stepData,
    onNext,
    onPrev,
    onTogglePlay,
    isPlaying,
    levers,
    onLeverChange,
    onScenarioChange,
    activeScenario,
    scenarioLibrary,
    supportedScenarios,
    leverDetails,
}) => {
    return (
        <div className="relative h-screen w-full overflow-hidden bg-slate-950 text-white">
            {/* Layer 1: The Stage (Visualization) */}
            <div className="absolute inset-0 z-0">
                {children}
            </div>

            {/* Layer 2: Top UI (Progress & Controls) */}
            <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/60 to-transparent">
                {/* Progress Stories Bar */}
                <div className="flex gap-1 mb-4">
                    {Array.from({ length: totalSteps }).map((_, idx) => (
                        <div 
                            key={idx} 
                            className={cn(
                                "h-1 rounded-full flex-1 transition-all duration-300",
                                idx <= currentStep ? "bg-white" : "bg-white/30"
                            )}
                        />
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold">P</div>
                         <span className="text-xs font-bold uppercase tracking-wider opacity-90">{scenarioTitle}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                         <button 
                            onClick={onTogglePlay}
                            className="flex items-center justify-center p-1.5 h-8 w-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white active:bg-white/20 transition-all"
                         >
                             {isPlaying ? (
                                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                             ) : (
                                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                             )}
                         </button>

                        <MobileControls
                             levers={levers}
                             onLeverChange={onLeverChange}
                             onScenarioChange={onScenarioChange}
                             activeScenario={activeScenario}
                             scenarioLibrary={scenarioLibrary}
                             supportedScenarios={supportedScenarios}
                             leverDetails={leverDetails}
                             trigger={
                                 <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-white active:bg-white/20 transition-all">
                                     <span>Tune</span>
                                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                                 </button>
                             }
                        />
                    </div>
                </div>
            </div>

            {/* Layer 3: Narrative Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 pb-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-5 shadow-2xl">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
                            Day {stepData.day}
                        </span>
                        <div className="flex gap-1">
                             {/* Mini Metrics Badge */}
                             <div className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono">
                                Merch: ₹{stepData.balances.merchantCash}
                             </div>
                        </div>
                    </div>
                    <div className="prose prose-invert prose-sm">
                        <p className="text-sm leading-snug font-medium text-slate-100">
                            {stepData.explanation}
                        </p>
                    </div>
                </div>
            </div>

            {/* Layer 4: Gesture Types (Invisible) */}
            <div className="absolute inset-0 z-10 flex">
                <div className="w-1/3 h-full" onClick={onPrev} />
                <div className="w-1/3 h-full flex items-center justify-center" onClick={onTogglePlay}>
                    {/* Play Pause Icon Flash can go here */}
                </div>
                <div className="w-1/3 h-full" onClick={onNext} />
            </div>
        </div>
    );
};

export default MobileStoryLayout;
