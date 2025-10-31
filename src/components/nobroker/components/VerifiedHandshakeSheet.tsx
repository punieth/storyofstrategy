import { MessageCircle, ShieldCheck, Info, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@components/razorpay/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@components/razorpay/ui/dialog";


interface VerifiedHandshakeCardProps {
  rmName: string;
  rmImage?: string;
  rmRole: string;
  status?: "pre-contact" | "quiet-mode" | "post-contact";
}

export const VerifiedHandshakeCard = ({
  rmName,
  rmImage,
  rmRole,
  status = "pre-contact",
}: VerifiedHandshakeCardProps) => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Generate initials if no image
  const initials = rmName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const getWhatsAppLink = () => {
    return `https://wa.me/919876543210?text=Hi ${rmName}, I'd like to discuss my listing.`;
  };

  return (
    <>
      <div className="bg-[#FFF8E1] border border-secondary/30 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Your NoBroker Guide</h3>
          <button
            onClick={() => setShowInfoModal(true)}
            className="text-xs text-secondary hover:text-secondary/80 flex items-center gap-1"
          >
            <Info className="h-3 w-3" />
            What does Verified mean?
          </button>
        </div>

        <div className="flex items-start gap-4 p-4 bg-white rounded-lg mb-4">
          {rmImage ? (
            <img
              src={rmImage}
              alt={rmName}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center text-lg font-bold">
              {initials}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{rmName}</h4>
              <ShieldCheck className="h-4 w-4 text-success fill-success" />
            </div>
            <p className="text-sm text-meta mb-1">{rmRole}</p>
            <p className="text-xs text-muted-foreground">
              Verified NoBroker Guide
            </p>
          </div>
        </div>

        {status === "pre-contact" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-3">
              {rmName} is assigned to your listing.
            </p>
            <Button
              variant="teal"
              className="w-full gap-2"
              onClick={() => window.open(getWhatsAppLink(), "_blank")}
            >
              <MessageCircle className="h-4 w-4" />
              MESSAGE ON WHATSAPP
            </Button>
            <Link to="/preferences" className="block">
              <Button variant="outline" className="w-full gap-2">
                <Settings className="h-3 w-3" />
                CHANGE PREFERENCES
              </Button>
            </Link>
          </div>
        )}

        {status === "quiet-mode" && (
          <div className="bg-white rounded-lg p-3 border border-quiet-mode-foreground/20">
            <p className="text-sm text-muted-foreground">
              {rmName} will contact you after Quiet Mode ends.
            </p>
          </div>
        )}

        {status === "post-contact" && (
          <div className="space-y-3">
            <p className="text-sm text-success font-medium">
              ✓ You've spoken with {rmName}
            </p>
            <button className="text-sm text-primary hover:underline">
              Rate your experience
            </button>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-secondary/20">
          <p className="text-xs text-muted-foreground">
            We only contact you through verified NoBroker representatives. You'll
            always see who's reaching out before they do.
          </p>
        </div>
      </div>

      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-success" />
              Verified NoBroker Guide
            </DialogTitle>
            <DialogDescription className="space-y-3 text-left pt-2">
              <p>
                All NoBroker Guides go through a rigorous verification process to
                ensure your safety and trust.
              </p>
              <p className="font-semibold text-foreground">
                What makes them verified:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Background checked and ID verified</li>
                <li>Trained on NoBroker policies and ethics</li>
                <li>Official company contact numbers only</li>
                <li>Real-time performance monitoring</li>
              </ul>
              <p className="text-xs pt-2">
                You can always verify their identity before engaging. We never ask
                for sensitive information over unofficial channels.
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
