import { Bell, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showNotifications?: boolean;
  onNotifications?: () => void;
  showLogo?: boolean;
}

export function MobileHeader({ 
  title, 
  showBack = false, 
  onBack, 
  showNotifications = false, 
  onNotifications,
  showLogo = false 
}: MobileHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        {showLogo && (
          <div className="text-lg" style={{ color: 'var(--razorpay-blue)', fontWeight: 'var(--font-weight-medium)' }}>
            RazorpayX
          </div>
        )}
        {title && (
          <h1 className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)' }}>
            {title}
          </h1>
        )}
      </div>
      
      {showNotifications && (
        <Button variant="ghost" size="sm" onClick={onNotifications} className="p-2">
          <Bell className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}