import { Download, Upload, FileText, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { MobileHeader } from './MobileHeader';

interface DocumentsHubProps {
  onNavigate: (screen: string) => void;
}

export function DocumentsHub({ onNavigate }: DocumentsHubProps) {
  const documents = [
    {
      id: 1,
      name: 'Payslip — Aug 2025',
      type: 'PDF',
      size: '125 KB',
      date: 'Aug 31, 2025'
    },
    {
      id: 2,
      name: 'Payslip — Jul 2025',
      type: 'PDF', 
      size: '118 KB',
      date: 'Jul 31, 2025'
    },
    {
      id: 3,
      name: 'Form 16 — FY 24/25',
      type: 'PDF',
      size: '245 KB',
      date: 'Apr 15, 2025'
    }
  ];

  return (
    <div className="mobile-container bg-white flex flex-col">
      <MobileHeader 
        title="Documents"
        showBack={true}
        onBack={() => onNavigate('dashboard')}
      />
      
      <div className="flex-1 p-4 space-y-6" style={{ backgroundColor: 'var(--bg-gray)' }}>
        {/* Upload Investment Proofs */}
        <Card className="razorpay-shadow" style={{ borderRadius: '12px', backgroundColor: '#FFFBEB', borderColor: 'var(--warning-yellow)' }}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--warning-yellow)' }} />
              <div className="flex-1">
                <h3 className="text-sm mb-2" style={{ fontWeight: 'var(--font-weight-medium)', color: '#92400E' }}>
                  Upload Investment Proofs
                </h3>
                <p className="text-sm mb-3" style={{ color: '#92400E' }}>
                  Submit your investment proofs to save tax. Due Oct 10.
                </p>
                <Button 
                  size="sm"
                  className="rounded-lg"
                  style={{ 
                    backgroundColor: 'var(--warning-yellow)', 
                    color: 'white',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Categories */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--razorpay-blue)' }} />
              <p className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>Payslips</p>
              <p className="text-xs" style={{ color: 'var(--text-gray)' }}>12 documents</p>
            </CardContent>
          </Card>
          
          <Card className="razorpay-shadow" style={{ borderRadius: '12px' }}>
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--success-green)' }} />
              <p className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>Tax Documents</p>
              <p className="text-xs" style={{ color: 'var(--text-gray)' }}>3 documents</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Documents */}
        <div className="space-y-3">
          <h3 className="text-lg" style={{ fontWeight: 'var(--font-weight-medium)' }}>
            Recent Documents
          </h3>
          
          {documents.map((doc) => (
            <Card key={doc.id} className="razorpay-shadow" style={{ borderRadius: '12px' }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--bg-gray)' }}
                  >
                    <FileText className="w-5 h-5" style={{ color: 'var(--razorpay-blue)' }} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      {doc.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs" style={{ color: 'var(--text-gray)' }}>
                        {doc.type} • {doc.size}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-gray)' }}>
                        {doc.date}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex-shrink-0 p-2"
                    style={{ color: 'var(--razorpay-blue)' }}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full h-12 rounded-xl"
            style={{ 
              borderColor: 'var(--razorpay-blue)', 
              color: 'var(--razorpay-blue)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            View All Payslips
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-12 rounded-xl"
            style={{ 
              borderColor: 'var(--razorpay-blue)', 
              color: 'var(--razorpay-blue)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            Download Form 16
          </Button>
        </div>
      </div>
    </div>
  );
}