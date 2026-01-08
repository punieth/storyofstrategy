import React from 'react';
import { cn } from '../lib/utils';
import type { ScenarioStep } from '../lib/types';

interface TimelineProps {
    steps: ScenarioStep[];
    currentStep: number;
    onStepChange: (step: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ steps, currentStep, onStepChange }) => {
    return (
        <div className="flex flex-col space-y-2">
             <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Timeline</p>
                <p className="text-[10px] font-medium text-slate-500">
                    Day {steps[currentStep]?.day ?? 0}
                </p>
            </div>
            
            <div className="relative flex items-center w-full h-12">
                {/* Connecting Line */}
                <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-slate-100" />

                {/* Steps */}
                <div className="relative flex w-full justify-between z-10">
                    {steps.map((step, index) => {
                        const isActive = index === currentStep;
                        const isPast = index < currentStep;

                        return (
                            <button
                                key={`${step.label}-${index}`}
                                onClick={() => onStepChange(index)}
                                className="group relative flex flex-col items-center focus:outline-none p-2 -m-2"
                            >
                                {/* Dot - larger for better tap targets */}
                                <div
                                    className={cn(
                                        "h-5 w-5 rounded-full border-2 transition-all duration-300 z-10",
                                        isActive
                                            ? "border-blue-600 bg-white scale-125 shadow-md"
                                            : isPast
                                                ? "border-blue-400 bg-blue-400"
                                                : "border-slate-300 bg-white hover:border-slate-400"
                                    )}
                                />
                                
                                {/* Label Tooltip (visible on hover or active) */}
                                <div className={cn(
                                    "absolute top-6 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium transition-all opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
                                    isActive && "opacity-100 translate-y-0"
                                )}>
                                    <span className={cn(
                                        "block text-center",
                                        isActive ? "text-blue-700" : "text-slate-500"
                                    )}>
                                        {step.label}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
