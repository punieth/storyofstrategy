import { Check, AlertTriangle, AlertCircle, Flag } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { MobileHeader } from './MobileHeader';

interface NotificationsScreenProps {
  onNavigate: (screen: string) => void;
}

export function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: Check,
      title: 'Salary Credited',
      message: 'Salary for Sep 30 credited at 3:04 PM',
      time: '2 hours ago',
      bgColor: '#F0FDF4',
      iconColor: 'var(--success-green)'
    },
    {
      id: 2,
      type: 'warning',
      icon: AlertTriangle,
      title: 'Action Required',
      message: 'Reimbursement needs proof document',
      time: '1 day ago',
      bgColor: '#FFFBEB',
      iconColor: 'var(--warning-yellow)'
    },
    {
      id: 3,
      type: 'error',
      icon: AlertCircle,
      title: 'Salary Delayed',
      message: 'Salary processing delayed due to system maintenance',
      time: '2 days ago',
      bgColor: '#FEF2F2',
      iconColor: 'var(--error-red)'
    }
  ];

  return (
    <div className="mobile-container bg-white flex flex-col">
      <MobileHeader 
        title="Notifications"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
      />
      
      <div className="flex-1 p-4 space-y-4" style={{ backgroundColor: 'var(--bg-gray)' }}>
        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <Card key={notification.id} className="razorpay-shadow" style={{ borderRadius: '12px' }}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: notification.bgColor }}
                    >
                      <IconComponent 
                        className="w-5 h-5" 
                        style={{ color: notification.iconColor }} 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                          {notification.title}
                        </h3>
                        <span className="text-xs" style={{ color: 'var(--text-gray)' }}>
                          {notification.time}
                        </span>
                      </div>
                      
                      <p className="text-sm" style={{ color: 'var(--text-gray)' }}>
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Report Delay Button */}
        <Card className="razorpay-shadow" style={{ borderRadius: '12px', backgroundColor: '#FEF2F2', borderColor: 'var(--error-red)' }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Flag className="w-5 h-5" style={{ color: 'var(--error-red)' }} />
              <div>
                <h3 className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--error-red)' }}>
                  Salary Issue?
                </h3>
                <p className="text-xs" style={{ color: 'var(--error-red)' }}>
                  Report if your salary is delayed or incorrect
                </p>
              </div>
            </div>
            
            <Button 
              className="w-full h-10 rounded-xl"
              style={{ 
                backgroundColor: 'var(--error-red)', 
                color: 'white',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Report Salary Delay
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
          <CardContent className="p-4">
            <h3 className="text-sm mb-3" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Notification Preferences
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--text-gray)' }}>Salary Updates</span>
                <div className="w-10 h-6 rounded-full" style={{ backgroundColor: 'var(--success-green)' }}>
                  <div className="w-4 h-4 bg-white rounded-full mt-1 ml-5 shadow-sm"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--text-gray)' }}>Request Updates</span>
                <div className="w-10 h-6 rounded-full" style={{ backgroundColor: 'var(--success-green)' }}>
                  <div className="w-4 h-4 bg-white rounded-full mt-1 ml-5 shadow-sm"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--text-gray)' }}>System Alerts</span>
                <div className="w-10 h-6 rounded-full" style={{ backgroundColor: '#E5E7EB' }}>
                  <div className="w-4 h-4 bg-white rounded-full mt-1 ml-1 shadow-sm"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}