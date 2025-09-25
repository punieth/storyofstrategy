import { useEffect, useRef, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PayslipScreen } from './components/PayslipScreen';
import { DeductionsExplainer } from './components/DeductionsExplainer';
import { NewRequestForm } from './components/NewRequestForm';
import { RequestsTracker } from './components/RequestsTracker';
import { NotificationsScreen } from './components/NotificationsScreen';
import { DocumentsHub } from './components/DocumentsHub';

const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;
const FRAME_PADDING = 8;
const FRAME_BORDER = 2;
const OUTER_WIDTH = SCREEN_WIDTH + (FRAME_PADDING + FRAME_BORDER) * 2;
const OUTER_HEIGHT = SCREEN_HEIGHT + (FRAME_PADDING + FRAME_BORDER) * 2;

export default function App({ initialScreen = 'dashboard' }) {
  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateScale = () => {
      if (!wrapperRef.current) {
        return;
      }

      const availableWidth = wrapperRef.current.offsetWidth;
      if (!availableWidth) {
        return;
      }

      const nextScale = Math.min(1, availableWidth / OUTER_WIDTH);
      setScale((prev) => (Math.abs(prev - nextScale) < 0.005 ? prev : nextScale));
    };

    updateScale();

    if (!wrapperRef.current) {
      return;
    }

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => updateScale());
      observer.observe(wrapperRef.current);
      return () => observer.disconnect();
    }

    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

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
    <div className="flex items-center justify-center p-4">
      <div
        ref={wrapperRef}
        className="phone-frame-wrapper"
        style={{ height: OUTER_HEIGHT * scale }}
      >
        <div
          className="phone-frame"
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}
