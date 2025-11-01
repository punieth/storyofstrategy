import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RadioGroupNoBroker, RadioGroupItemNoBroker } from "@components/razorpay/ui/radio-group-nobroker";
import { Label } from "@components/razorpay/ui/label";
import { CheckboxNoBroker } from "@components/razorpay/ui/checkbox-nobroker";
import { Button } from "@components/razorpay/ui/button";
import { Screen } from "../components/Screen";

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
    <Screen
      title="Communication Preferences"
      onBack={() => navigate(-1)}
    >
      <div className="space-y-6 pb-6">
        {/* Contact Method Section */}
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-4">Contact Method</h3>
          <RadioGroupNoBroker value={contactMethod} onValueChange={setContactMethod} className="space-y-3">
            <div className="flex items-center gap-3">
              <RadioGroupItemNoBroker value="whatsapp" id="pref-whatsapp" />
              <Label htmlFor="pref-whatsapp" className="cursor-pointer">
                WhatsApp Digest (Recommended)
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItemNoBroker value="email" id="pref-email" />
              <Label htmlFor="pref-email" className="cursor-pointer">
                Email Only
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItemNoBroker value="call" id="pref-call" />
              <Label htmlFor="pref-call" className="cursor-pointer">
                Calls Allowed
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItemNoBroker value="call_later" id="pref-call-later" />
              <Label htmlFor="pref-call-later" className="cursor-pointer">
                Call Later (After 72 hours)
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItemNoBroker value="no_contact" id="pref-no-contact" />
              <Label htmlFor="pref-no-contact" className="cursor-pointer">
                No Contact for 3 Days
              </Label>
            </div>
          </RadioGroupNoBroker>
        </div>

        {/* Call Window Preferences */}
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-4">Preferred Call Windows</h3>
          <p className="text-sm text-meta mb-4">
            Select when we can reach you by phone
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckboxNoBroker 
                id="morning"
                checked={callWindows.includes("morning")}
                onCheckedChange={() => toggleCallWindow("morning")}
              />
              <Label htmlFor="morning" className="cursor-pointer">
                Morning (8 AM - 12 PM IST)
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <CheckboxNoBroker 
                id="afternoon"
                checked={callWindows.includes("afternoon")}
                onCheckedChange={() => toggleCallWindow("afternoon")}
              />
              <Label htmlFor="afternoon" className="cursor-pointer">
                Afternoon (12 PM - 5 PM IST)
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <CheckboxNoBroker
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

        {/* Guide Identity Info */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Guide Identity Preview</h4>
              <p className="text-xs text-muted-foreground">
                We only use verified NoBroker numbers. You’ll see your guide’s profile before any call or WhatsApp ping.
              </p>
            </div>
          </div>
        </div>

        <Button variant="cta" className="w-full" onClick={handleSave}>
          SAVE CHANGES
        </Button>
      </div>
    </Screen>
  );
};

export default Preferences;
