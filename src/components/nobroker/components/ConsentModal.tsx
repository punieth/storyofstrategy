import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check } from "lucide-react";
import { Button } from "@components/razorpay/ui/button";
import { RadioGroupNoBroker, RadioGroupItemNoBroker } from "@components/razorpay/ui/radio-group-nobroker";
import { Label } from "@components/razorpay/ui/label";

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  isNRI?: boolean;
}

const contactOptions = [
  {
    value: "whatsapp",
    label: "WhatsApp Digest",
    description: "Weekly summary on WhatsApp",
    recommended: true,
  },
  {
    value: "email",
    label: "Email Only",
    description: "Receive updates via email",
  },
  {
    value: "call_later",
    label: "Call Later",
    description: "We'll reach out at a convenient time",
  },
  {
    value: "no_contact",
    label: "No Contact for 3 Days",
    description: "Quiet Mode - We'll check back later",
  },
];

export const ConsentModal = ({ isOpen, onClose, isNRI = false }: ConsentModalProps) => {
  const [selected, setSelected] = useState("whatsapp");
  const navigate = useNavigate();

  const handleSave = () => {
    // Navigate to Listings with quiet mode state based on selection
    const isQuietMode = ["whatsapp", "email", "call_later", "no_contact"].includes(selected);
    navigate(`/listings?state=${isQuietMode ? 'quiet-on' : 'quiet-off'}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="nb-modal-overlay" role="dialog" aria-modal="true">
      <div className="nb-modal">
        <div className="nb-modal__content">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Choose how we contact you</h2>
              {isNRI && (
                <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                  NRI MODE
                </span>
              )}
            </div>
            <button onClick={onClose} className="p-1 -mr-1" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Your property is verified! Let us know your preferred way to stay updated.
          </p>

          <RadioGroupNoBroker value={selected} onValueChange={setSelected} className="space-y-3">
            {contactOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-start gap-3 p-4 rounded-lg border-2 border-border bg-card cursor-pointer hover:border-accent transition-colors"
                onClick={() => setSelected(option.value)}
              >
                <RadioGroupItemNoBroker value={option.value} id={option.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="flex items-center gap-2 cursor-pointer">
                    <span className="font-medium">{option.label}</span>
                    {option.recommended && (
                      <span className="bg-success text-success-foreground text-[10px] font-bold px-2 py-0.5 rounded">
                        RECOMMENDED
                      </span>
                    )}
                  </Label>
                  <p className="text-sm text-meta mt-0.5">{option.description}</p>
                </div>
                {selected === option.value && (
                  <Check className="h-5 w-5 text-accent flex-shrink-0" />
                )}
              </div>
            ))}
          </RadioGroupNoBroker>

          <div className="mt-6 flex flex-col gap-3">
            <Button variant="cta" className="w-full" onClick={handleSave}>
              SAVE PREFERENCES
            </Button>
            <button className="text-sm text-primary hover:underline">
              Learn more about communication preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
