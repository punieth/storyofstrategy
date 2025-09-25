import { Upload, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { MobileHeader } from './MobileHeader';

interface NewRequestFormProps {
  onNavigate: (screen: string) => void;
}

export function NewRequestForm({ onNavigate }: NewRequestFormProps) {
  return (
    <div className="mobile-container bg-white flex flex-col">
      <MobileHeader 
        title="New Request"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
      />
      
      <div className="flex-1 p-4 space-y-6" style={{ backgroundColor: 'var(--bg-gray)' }}>
        {/* Form */}
        <div className="space-y-4">
          {/* Request Type */}
          <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
            <CardContent className="p-4 space-y-3">
              <Label className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                Request Type
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select request type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="advance">Salary Advance</SelectItem>
                  <SelectItem value="reimbursement">Reimbursement</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Amount */}
          <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
            <CardContent className="p-4 space-y-3">
              <Label className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                Amount (₹)
              </Label>
              <Input 
                type="number" 
                placeholder="Enter amount"
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Reason */}
          <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
            <CardContent className="p-4 space-y-3">
              <Label className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                Reason
              </Label>
              <Textarea 
                placeholder="Provide details about your request..."
                className="min-h-20"
              />
            </CardContent>
          </Card>

          {/* Upload Proof */}
          <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
            <CardContent className="p-4 space-y-3">
              <Label className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                Upload Proof
              </Label>
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-xl"
                style={{ 
                  borderColor: 'var(--border)', 
                  color: 'var(--text-gray)',
                  borderStyle: 'dashed'
                }}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info */}
        <Card className="razorpay-shadow" style={{ borderRadius: '12px', backgroundColor: '#FFFBEB', borderColor: 'var(--warning-yellow)' }}>
          <CardContent className="p-4">
            <p className="text-sm" style={{ color: '#92400E' }}>
              💡 Max ₹20,000; typical approval ~2 days.
            </p>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          className="w-full h-12 rounded-xl"
          style={{ 
            backgroundColor: 'var(--razorpay-blue)', 
            color: 'white',
            fontWeight: 'var(--font-weight-medium)'
          }}
          onClick={() => onNavigate('requests')}
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Request
        </Button>
      </div>
    </div>
  );
}