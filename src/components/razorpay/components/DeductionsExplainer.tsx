import { Info } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { MobileHeader } from './MobileHeader';

interface DeductionsExplainerProps {
  onNavigate: (screen: string) => void;
}

export function DeductionsExplainer({ onNavigate }: DeductionsExplainerProps) {
  return (
    <div className="mobile-container bg-white flex flex-col">
      <MobileHeader 
        title="Provident Fund (PF)"
        showBack={true}
        onBack={() => onNavigate('payslip')}
      />
      
      <div className="flex-1 p-4 space-y-6" style={{ backgroundColor: 'var(--bg-gray)' }}>
        {/* PF Details */}
        <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
          <CardContent className="p-4 space-y-4">
            <h3 className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Your PF Contribution
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-gray)' }}>
                <p className="text-sm" style={{ color: 'var(--text-gray)' }}>Employee Contribution (You)</p>
                <p className="text-xl" style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--error-red)' }}>₹4,800</p>
                <p className="text-xs" style={{ color: 'var(--text-gray)' }}>12% of basic salary (₹30,000)</p>
              </div>
              
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-gray)' }}>
                <p className="text-sm" style={{ color: 'var(--text-gray)' }}>Employer Contribution</p>
                <p className="text-xl" style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--success-green)' }}>₹4,800</p>
                <p className="text-xs" style={{ color: 'var(--text-gray)' }}>Employer also adds 12%</p>
              </div>
            </div>
            
            <div className="border-t pt-3" style={{ borderColor: 'var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--text-gray)' }}>Total Monthly PF</p>
              <p className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)' }}>₹9,600</p>
            </div>
          </CardContent>
        </Card>

        {/* Tax Savings Info */}
        <Card className="razorpay-shadow" style={{ borderRadius: '12px', backgroundColor: '#EBF4FF', borderColor: 'var(--razorpay-blue)' }}>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--razorpay-blue)' }} />
              <div className="space-y-2">
                <p className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--razorpay-blue)' }}>
                  Tax Saving Opportunity
                </p>
                <p className="text-sm" style={{ color: 'var(--razorpay-blue)' }}>
                  If you upload tax proofs by Oct 10, your TDS may reduce to ₹3,500 next month.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Deductions */}
        <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
          <CardContent className="p-4 space-y-3">
            <h3 className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Other Deductions
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: 'var(--text-gray)' }}>TDS (Tax Deducted at Source)</span>
                <span className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>₹200</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: 'var(--text-gray)' }}>Total Deductions</span>
                <span className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--error-red)' }}>₹5,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}