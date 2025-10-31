import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { VerifiedHandshakeCard } from "../components/VerifiedHandshakeSheet";

import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@components/razorpay/ui/button";

const VerifiedHandshake = () => {
  const [status, setStatus] = useState<"pre-contact" | "quiet-mode" | "post-contact">("pre-contact");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Verified Handshake Demo" />
      
      <main className="pt-16 px-4 max-w-md mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary mb-4 mt-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="py-4">
          <div className="text-center mb-6">
            <ShieldCheck className="h-12 w-12 mx-auto mb-3 text-success" />
            <h2 className="text-lg font-semibold mb-2">
              Trust-First Contact
            </h2>
            <p className="text-sm text-meta">
              See who's assigned to your listing before they reach out
            </p>
          </div>

          <VerifiedHandshakeCard
            rmName="Priya Sharma"
            rmImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop"
            rmRole="Helps with listing verification"
            status={status}
          />

          <div className="bg-card rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-sm mb-3">Preview Different States:</h3>
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
      </main>

      <BottomNav />
    </div>
  );
};

export default VerifiedHandshake;
