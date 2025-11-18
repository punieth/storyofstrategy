import React from 'react';
import type { Levers, ScenarioType } from '../lib/types';
import { cn } from '../lib/utils';

interface ControlsPanelProps {
    levers: Levers;
    onLeverChange: (levers: Partial<Levers>) => void;
    onScenarioChange: (scenarioType: ScenarioType) => void;
    activeScenario: ScenarioType;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
        <div className="space-y-2">{children}</div>
    </div>
);

const RadioButton: React.FC<{ name: string; value: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; label: string }> = ({ name, value, checked, onChange, label }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="form-radio text-blue-600" />
        <span className="text-gray-700">{label}</span>
    </label>
);

const ScenarioButton: React.FC<{ onClick: () => void; children: React.ReactNode, isActive: boolean }> = ({ onClick, children, isActive }) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full text-left px-4 py-2 rounded-md transition-colors",
            {
                "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50": isActive,
                "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400": !isActive
            }
        )}
    >
        {children}
    </button>
);


const ControlsPanel: React.FC<ControlsPanelProps> = ({ levers, onLeverChange, onScenarioChange, activeScenario }) => {
    const handleRadioChange = (lever: keyof Levers) => (e: React.ChangeEvent<HTMLInputElement>) => {
        onLeverChange({ [lever]: e.target.value });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-2">Controls</h2>

            <Section title="Design Levers">
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium text-gray-600">Capture Mode</h4>
                        <RadioButton name="captureMode" value="auto" checked={levers.captureMode === 'auto'} onChange={handleRadioChange('captureMode')} label="Auto-Capture" />
                        <RadioButton name="captureMode" value="manual" checked={levers.captureMode === 'manual'} onChange={handleRadioChange('captureMode')} label="Manual-Capture" />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-600">Payout Schedule</h4>
                        <RadioButton name="payoutSchedule" value="instant" checked={levers.payoutSchedule === 'instant'} onChange={handleRadioChange('payoutSchedule')} label="Instant" />
                        <RadioButton name="payoutSchedule" value="T+2" checked={levers.payoutSchedule === 'T+2'} onChange={handleRadioChange('payoutSchedule')} label="T+2 Days" />
                        <RadioButton name="payoutSchedule" value="T+7" checked={levers.payoutSchedule === 'T+7'} onChange={handleRadioChange('payoutSchedule')} label="T+7 Days" />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-600">Refund Policy</h4>
                        <RadioButton name="refundPolicy" value="instant" checked={levers.refundPolicy === 'instant'} onChange={handleRadioChange('refundPolicy')} label="Instant Refund" />
                        <RadioButton name="refundPolicy" value="after_payout" checked={levers.refundPolicy === 'after_payout'} onChange={handleRadioChange('refundPolicy')} label="Refund After Payout" />
                    </div>
                </div>
            </Section>

            <Section title="Scenarios">
                <div className="space-y-3">
                    <ScenarioButton onClick={() => onScenarioChange('normal_payment')} isActive={activeScenario === 'normal_payment'}>Run Normal Payment</ScenarioButton>
                    <ScenarioButton onClick={() => onScenarioChange('refund')} isActive={activeScenario === 'refund'}>Run Refund</ScenarioButton>
                    <ScenarioButton onClick={() => onScenarioChange('auth_capture_fail')} isActive={activeScenario === 'auth_capture_fail'}>Run Auth/Capture Fail</ScenarioButton>
                    <ScenarioButton onClick={() => onScenarioChange('chargeback')} isActive={activeScenario === 'chargeback'}>Run Chargeback</ScenarioButton>
                    <ScenarioButton onClick={() => onScenarioChange('chargeback_win')} isActive={activeScenario === 'chargeback_win'}>Run Chargeback (Win)</ScenarioButton>
                    <ScenarioButton onClick={() => onScenarioChange('chargeback_loss')} isActive={activeScenario === 'chargeback_loss'}>Run Chargeback (Loss)</ScenarioButton>
                </div>
            </Section>
        </div>
    );
};

export default ControlsPanel;
