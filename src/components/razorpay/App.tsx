import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PayslipScreen } from './components/PayslipScreen';
import { DeductionsExplainer } from './components/DeductionsExplainer';
import { NewRequestForm } from './components/NewRequestForm';
import { RequestsTracker } from './components/RequestsTracker';
import { NotificationsScreen } from './components/NotificationsScreen';
import { DocumentsHub } from './components/DocumentsHub';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'payslip':
        return <PayslipScreen onNavigate={handleNavigate} />;
      case 'deductions':
        return <DeductionsExplainer onNavigate={handleNavigate} />
      case 'new-request':
        return <NewRequestForm onNavigate={handleNavigate} />;
      case 'requests':
        return <RequestsTracker onNavigate={handleNavigate} />;
      case 'notifications':
        return <NotificationsScreen onNavigate={handleNavigate} />;
      case 'documents':
        return <DocumentsHub onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="mobile-container bg-white rounded-2xl overflow-hidden shadow-2xl">
        {renderScreen()}
      </div>
      
      {/* Screen Navigation Debug Panel (Hidden in production) */}
      {/* <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded-lg text-xs space-y-1 opacity-20 hover:opacity-100 transition-opacity">
        <div className="font-semibold">Current: {currentScreen}</div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <button onClick={() => setCurrentScreen('dashboard')} className="p-1 bg-blue-600 rounded">Dashboard</button>
          <button onClick={() => setCurrentScreen('payslip')} className="p-1 bg-blue-600 rounded">Payslip</button>
          <button onClick={() => setCurrentScreen('deductions')} className="p-1 bg-blue-600 rounded">Deductions</button>
          <button onClick={() => setCurrentScreen('new-request')} className="p-1 bg-blue-600 rounded">New Request</button>
          <button onClick={() => setCurrentScreen('requests')} className="p-1 bg-blue-600 rounded">Requests</button>
          <button onClick={() => setCurrentScreen('notifications')} className="p-1 bg-blue-600 rounded">Notifications</button>
          <button onClick={() => setCurrentScreen('documents')} className="p-1 bg-blue-600 rounded">Documents</button>
        </div>
      </div> */}
    </div>
  );
}