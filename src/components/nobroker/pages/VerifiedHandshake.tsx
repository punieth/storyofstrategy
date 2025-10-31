import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifiedHandshakeCard } from "../components/VerifiedHandshakeSheet";

import { ShieldCheck } from "lucide-react";
import { Button } from "@components/razorpay/ui/button";
import { Screen } from "../components/Screen";

const VerifiedHandshake = () => {
  const [status, setStatus] = useState<"pre-contact" | "quiet-mode" | "post-contact">("pre-contact");
  const navigate = useNavigate();

  return (
    <Screen
      title="Verified Handshake Demo"
      onBack={() => navigate(-1)}
      contentClassName="pt-5 pb-3"
    >
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <ShieldCheck className="h-10 w-10 mx-auto text-success" />
          <h2 className="text-base font-semibold">
            Trust-First Contact
          </h2>
          <p className="text-xs text-meta">
            See who's assigned to your listing before they reach out
          </p>
        </div>

        <VerifiedHandshakeCard
          rmName="Priya Sharma"
          rmImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop"
          rmRole="Helps with listing verification"
          status={status}
          variant="compact"
        />

        <div className="bg-card rounded-lg p-3 space-y-2">
          <h3 className="font-semibold text-sm">Preview Different States:</h3>
          <Button
            variant={status === "pre-contact" ? "cta" : "outline"}
            size="sm"
            onClick={() => setStatus("pre-contact")}
            className="w-full"
          >
            Pre-Contact
          </Button>
          <Button
            variant={status === "quiet-mode" ? "cta" : "outline"}
            size="sm"
            onClick={() => setStatus("quiet-mode")}
            className="w-full"
          >
            Quiet Mode Active
          </Button>
          <Button
            variant={status === "post-contact" ? "cta" : "outline"}
            size="sm"
            onClick={() => setStatus("post-contact")}
            className="w-full"
          >
            Post-Contact
          </Button>
        </div>
      </div>
    </Screen>
  );
};

export default VerifiedHandshake;
