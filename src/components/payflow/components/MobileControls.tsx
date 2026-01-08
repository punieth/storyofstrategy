import React from 'react';
import { Drawer } from 'vaul';
import ControlsPanel from './ControlsPanel';
import type { CoreScenarioType, Levers } from '../lib/types';

interface MobileControlsProps {
    levers: Levers;
    onLeverChange: (levers: Partial<Levers>) => void;
    onScenarioChange: (scenario: CoreScenarioType) => void;
    activeScenario: CoreScenarioType;
    scenarioLibrary: any;
    supportedScenarios: CoreScenarioType[];
    leverDetails: any;
    trigger?: React.ReactNode;
}

const MobileControls: React.FC<MobileControlsProps> = ({ trigger, ...props }) => {
    const [open, setOpen] = React.useState(false);
    
    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger asChild>
                {trigger ? (
                    trigger
                ) : (
                    <button className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl transition-transform hover:scale-105 active:scale-95 md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                )}
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
                <Drawer.Content className="bg-white flex flex-col rounded-t-[20px] h-[70vh] fixed bottom-0 left-0 right-0 z-50 outline-none">
                    <div className="p-4 bg-white rounded-t-[20px] flex-1 overflow-y-auto pb-24">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-slate-300 mb-4" />
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold">Configure Simulation</h2>
                                <button 
                                    onClick={() => setOpen(false)}
                                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                            <ControlsPanel {...props} />
                        </div>
                    </div>
                    {/* Fixed Apply Button */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200">
                        <button 
                            onClick={() => setOpen(false)}
                            className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl active:bg-slate-800 transition-colors"
                        >
                            Apply Changes
                        </button>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default MobileControls;
