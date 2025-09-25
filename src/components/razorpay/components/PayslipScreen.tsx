import { Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { MobileHeader } from './MobileHeader';

interface PayslipScreenProps {
  onNavigate: (screen: string) => void;
}

export function PayslipScreen({ onNavigate }: PayslipScreenProps) {
  return (
    <div className="mobile-container bg-white flex flex-col">
      <MobileHeader 
        title="September Payslip"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
      />
      
      <div className="flex-1 p-4 space-y-6" style={{ backgroundColor: 'var(--bg-gray)' }}>
        {/* Salary Breakdown */}
        <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
          <CardContent className="p-4 space-y-4">
            <h3 className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Salary Breakdown
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: 'var(--text-gray)' }}>Basic Salary</span>
                <span className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>₹30,000</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: 'var(--text-gray)' }}>HRA</span>
                <span className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>₹15,000</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: 'var(--text-gray)' }}>Allowances</span>
                <span className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>₹8,000</span>
              </div>
              
              <div className="h-px" style={{ backgroundColor: 'var(--border)' }}></div>
              
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: 'var(--error-red)' }}>Deductions</span>
                <span className="text-sm" style={{ color: 'var(--error-red)', fontWeight: 'var(--font-weight-medium)' }}>-₹5,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Net Salary Highlight */}
        <Card className="razorpay-shadow" style={{ borderRadius: '12px', backgroundColor: 'var(--success-green)' }}>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-white opacity-90 mb-1">Net Salary</p>
            <p className="text-2xl text-white" style={{ fontWeight: 'var(--font-weight-medium)' }}>₹48,000</p>
          </CardContent>
        </Card>

        {/* Download Button */}
        <Button 
          className="w-full h-12 rounded-xl"
          style={{ 
            backgroundColor: 'var(--razorpay-blue)', 
            color: 'white',
            fontWeight: 'var(--font-weight-medium)'
          }}
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start p-0"
            style={{ color: 'var(--razorpay-blue)' }}
            onClick={() => onNavigate('deductions')}
          >
            View Deduction Details →
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start p-0"
            style={{ color: 'var(--razorpay-blue)' }}
            onClick={() => onNavigate('documents')}
          >
            View All Payslips →
          </Button>
        </div>
      </div>
    </div>
  );
}