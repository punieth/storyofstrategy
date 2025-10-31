import { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { RadioGroup, RadioGroupItem } from "@components/razorpay/ui/radio-group";
import { Label } from "@components/razorpay/ui/label";
import { Checkbox } from "@components/razorpay/ui/checkbox";
import { Button } from "@components/razorpay/ui/button";

const Preferences = () => {
  const navigate = useNavigate();
  const [contactMethod, setContactMethod] = useState("whatsapp");
  const [callWindows, setCallWindows] = useState<string[]>(["morning"]);

  const handleSave = () => {
    // Conditional navigation based on contact method
    if (contactMethod === "call") {
      navigate('/listings?state=quiet-off');
    } else {
      navigate('/listings?state=quiet-on');
    }
  };

  const toggleCallWindow = (window: string) => {
    setCallWindows(prev => 
      prev.includes(window) 
        ? prev.filter(w => w !== window)
        : [...prev, window]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Communication Preferences" />
      
      <main className="pt-16 px-4 max-w-md mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary mb-4 mt-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="space-y-6">
          {/* Contact Method Section */}
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-4">Contact Method</h3>
            <RadioGroup value={contactMethod} onValueChange={setContactMethod} className="space-y-3">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="whatsapp" id="pref-whatsapp" />
                <Label htmlFor="pref-whatsapp" className="cursor-pointer">
                  WhatsApp Digest (Recommended)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="email" id="pref-email" />
                <Label htmlFor="pref-email" className="cursor-pointer">
                  Email Only
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="call" id="pref-call" />
                <Label htmlFor="pref-call" className="cursor-pointer">
                  Calls Allowed
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="call_later" id="pref-call-later" />
                <Label htmlFor="pref-call-later" className="cursor-pointer">
                  Call Later (After 72 hours)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no_contact" id="pref-no-contact" />
                <Label htmlFor="pref-no-contact" className="cursor-pointer">
                  No Contact for 3 Days
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Call Window Preferences */}
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-4">Preferred Call Windows</h3>
            <p className="text-sm text-meta mb-4">
              Select when we can reach you by phone
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox 
                  id="morning"
                  checked={callWindows.includes("morning")}
                  onCheckedChange={() => toggleCallWindow("morning")}
                />
                <Label htmlFor="morning" className="cursor-pointer">
                  Morning (8 AM - 12 PM IST)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox 
                  id="afternoon"
                  checked={callWindows.includes("afternoon")}
                  onCheckedChange={() => toggleCallWindow("afternoon")}
                />
                <Label htmlFor="afternoon" className="cursor-pointer">
                  Afternoon (12 PM - 5 PM IST)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox 
                  id="evening"
                  checked={callWindows.includes("evening")}
                  onCheckedChange={() => toggleCallWindow("evening")}
                />
                <Label htmlFor="evening" className="cursor-pointer">
                  Evening (5 PM - 9 PM IST)
                </Label>
              </div>
            </div>
          </div>

          {/* Verified Caller Info */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Verified Caller Information</h4>
                <p className="text-xs text-muted-foreground">
                  We only call from verified NoBroker numbers. You'll always see caller information before answering.
                </p>
              </div>
            </div>
          </div>

          <Button variant="cta" className="w-full" onClick={handleSave}>
            SAVE CHANGES
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Preferences;
