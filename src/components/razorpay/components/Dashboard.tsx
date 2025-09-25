import { Check, FileText, Receipt } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { MobileHeader } from './MobileHeader';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="mobile-container bg-white flex flex-col">
      <MobileHeader 
        showLogo={true}
        showNotifications={true}
        onNotifications={() => onNavigate('notifications')}
      />
      
      <div className="flex-1 p-4 space-y-6" style={{ backgroundColor: 'var(--bg-gray)' }}>
        {/* Greeting */}
        <div className="space-y-1">
          <h2 className="text-xl" style={{ fontWeight: 'var(--font-weight-medium)' }}>
            Hello, Ramesh
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-gray)' }}>
            Your September payout is on track.
          </p>
        </div>

        {/* Salary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
            <CardContent className="p-4 space-y-2">
              <p className="text-xs" style={{ color: 'var(--text-gray)' }}>Next Salary</p>
              <p className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)' }}>₹58,000</p>
              <p className="text-xs" style={{ color: 'var(--text-gray)' }}>Sep 30</p>
            </CardContent>
          </Card>
          
          <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-xs" style={{ color: 'var(--text-gray)' }}>Last Salary</p>
                <Check className="w-3 h-3" style={{ color: 'var(--success-green)' }} />
              </div>
              <p className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)' }}>₹55,000</p>
              <p className="text-xs" style={{ color: 'var(--text-gray)' }}>Aug 31</p>
            </CardContent>
          </Card>
        </div>

        {/* Status Block */}
        <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success-green)' }}></div>
              <p className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>Processing → Credited</p>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-gray)' }}>ETA today 3–5 PM</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full h-12 rounded-xl"
            style={{ 
              backgroundColor: 'var(--razorpay-blue)', 
              color: 'white',
              fontWeight: 'var(--font-weight-medium)'
            }}
            onClick={() => onNavigate('payslip')}
          >
            <FileText className="w-4 h-4 mr-2" />
            View Payslip
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-12 rounded-xl"
            style={{ 
              borderColor: 'var(--razorpay-blue)', 
              color: 'var(--razorpay-blue)',
              fontWeight: 'var(--font-weight-medium)'
            }}
            onClick={() => onNavigate('new-request')}
          >
            <Receipt className="w-4 h-4 mr-2" />
            Request Reimbursement
          </Button>
        </div>
      </div>
    </div>
  );
}