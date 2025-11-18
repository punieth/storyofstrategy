import React, { useState, useEffect, useCallback } from 'react';
import ControlsPanel from './components/ControlsPanel';
import VisualizationPanel from './components/VisualizationPanel';
import ExplanationPanel from './components/ExplanationPanel';
import type { Levers, ScenarioStep, ScenarioType } from './lib/types';
import { simulateScenario } from './lib/simulation';

const App = () => {
    const [levers, setLevers] = useState<Levers>({
        captureMode: 'auto',
        payoutSchedule: 'T+2',
        refundPolicy: 'instant',
    });
    const [activeScenario, setActiveScenario] = useState<ScenarioType>('normal_payment');
    const [scenarioSteps, setScenarioSteps] = useState<ScenarioStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);

    const handleRunScenario = (scenario: ScenarioType) => {
        console.log('runScenario called with:', scenario, 'and levers:', levers);
        const results = simulateScenario(levers, scenario);
        console.log('simulation results:', results);
        setScenarioSteps(results);
        setCurrentStep(0);
    };

    useEffect(() => {
        handleRunScenario(activeScenario);
    }, [levers, activeScenario]);

    const handleLeversChange = (newLevers: Partial<Levers>) => {
        setLevers(prev => ({ ...prev, ...newLevers }));
    };
    
    const handleScenarioChange = (scenario: ScenarioType) => {
        setActiveScenario(scenario);
    }

    return (
        <div className="p-4 font-sans bg-gray-50 min-h-screen">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Payflow: The Payments Decision Lab</h1>
                <p className="text-lg text-gray-600">Toggle levers, run scenarios, and build intuition.</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                    <ControlsPanel
                        levers={levers}
                        onLeverChange={handleLeversChange}
                        onScenarioChange={handleScenarioChange}
                        activeScenario={activeScenario}
                    />
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <VisualizationPanel steps={scenarioSteps} currentStep={currentStep} onStepChange={setCurrentStep} />
                </div>
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                    <ExplanationPanel step={scenarioSteps[currentStep]} />
                </div>
            </div>
        </div>
    );
};

export default App;
