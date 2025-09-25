import { Check, Clock, AlertTriangle, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { MobileHeader } from './MobileHeader';

interface RequestsTrackerProps {
  onNavigate: (screen: string) => void;
}

export function RequestsTracker({ onNavigate }: RequestsTrackerProps) {
  const requests = [
    {
      id: 1,
      type: 'Salary Advance',
      amount: '₹10,000',
      status: 'Approved',
      date: 'Sep 25, 2024',
      icon: Check,
      statusColor: 'var(--success-green)',
      bgColor: '#F0FDF4'
    },
    {
      id: 2,
      type: 'Reimbursement',
      amount: '₹2,000',
      status: 'Pending',
      date: 'Sep 28, 2024',
      icon: Clock,
      statusColor: 'var(--warning-yellow)',
      bgColor: '#FFFBEB'
    },
    {
      id: 3,
      type: 'Reimbursement',
      amount: '₹1,200',
      status: 'Needs Info',
      date: 'Sep 26, 2024',
      icon: AlertTriangle,
      statusColor: 'var(--error-red)',
      bgColor: '#FEF2F2'
    }
  ];

  return (
    <div className="mobile-container bg-white flex flex-col">
      <MobileHeader 
        title="Your Requests"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
      />
      
      <div className="flex-1 p-4 space-y-4" style={{ backgroundColor: 'var(--bg-gray)' }}>
        {/* New Request Button */}
        <Button 
          className="w-full h-12 rounded-xl"
          style={{ 
            backgroundColor: 'var(--razorpay-blue)', 
            color: 'white',
            fontWeight: 'var(--font-weight-medium)'
          }}
          onClick={() => onNavigate('new-request')}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>

        {/* Requests List */}
        <div className="space-y-3">
          {requests.map((request) => {
            const IconComponent = request.icon;
            return (
              <Card key={request.id} className="razorpay-shadow" style={{ borderRadius: '12px' }}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                          {request.type}
                        </h3>
                        <div 
                          className="px-2 py-1 rounded-full flex items-center gap-1"
                          style={{ backgroundColor: request.bgColor }}
                        >
                          <IconComponent 
                            className="w-3 h-3" 
                            style={{ color: request.statusColor }} 
                          />
                          <span 
                            className="text-xs"
                            style={{ 
                              color: request.statusColor,
                              fontWeight: 'var(--font-weight-medium)'
                            }}
                          >
                            {request.status}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-lg mb-1" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                        {request.amount}
                      </p>
                      
                      <p className="text-xs" style={{ color: 'var(--text-gray)' }}>
                        Submitted on {request.date}
                      </p>
                    </div>
                  </div>
                  
                  {request.status === 'Needs Info' && (
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        style={{ 
                          borderColor: 'var(--error-red)', 
                          color: 'var(--error-red)'
                        }}
                      >
                        Provide Information
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Card */}
        <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
          <CardContent className="p-4">
            <h3 className="text-sm mb-3" style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--text-gray)' }}>
              Request Summary
            </h3>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--success-green)' }}>1</p>
                <p className="text-xs" style={{ color: 'var(--text-gray)' }}>Approved</p>
              </div>
              <div>
                <p className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--warning-yellow)' }}>1</p>
                <p className="text-xs" style={{ color: 'var(--text-gray)' }}>Pending</p>
              </div>
              <div>
                <p className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--error-red)' }}>1</p>
                <p className="text-xs" style={{ color: 'var(--text-gray)' }}>Needs Info</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}