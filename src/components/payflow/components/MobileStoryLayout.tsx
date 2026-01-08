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
                                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                                 </button>
                             }
                        />
                    </div>
                </div>
            </div>

            {/* Layer 3: Narrative Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 pb-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-5 shadow-2xl min-h-[140px] flex flex-col justify-center transition-all duration-300">
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
                        <p className="text-sm leading-relaxed font-medium text-slate-100 line-clamp-3">
                            {stepData.explanation}
                        </p>
                    </div>
                </div>
            </div>

            {/* Layer 4: Gesture Areas with Visual Hints */}
            <div className="absolute inset-0 z-10 flex">
                <div className="w-1/3 h-full flex items-center justify-start pl-2 group" onClick={onPrev}>
                    {currentStep > 0 && (
                        <div className="opacity-30 group-active:opacity-60 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </div>
                    )}
                </div>
                <div className="w-1/3 h-full flex items-center justify-center" onClick={onTogglePlay} />
                <div className="w-1/3 h-full flex items-center justify-end pr-2 group" onClick={onNext}>
                    {currentStep < totalSteps - 1 && (
                        <div className="opacity-30 group-active:opacity-60 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileStoryLayout;
