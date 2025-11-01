import { MessageCircle, ShieldCheck, Info, Settings, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@components/razorpay/ui/button";
import { DialogNoBroker, DialogContentNoBroker, DialogHeaderNoBroker, DialogTitleNoBroker, DialogDescriptionNoBroker } from "@components/razorpay/ui/dialog-nobroker";
import { cn } from "../lib/utils";


interface VerifiedHandshakeCardProps {
  rmName: string;
  rmImage?: string;
  rmRole: string;
  status?: "pre-contact" | "quiet-mode" | "post-contact";
  onDismiss?: () => void;
  variant?: "default" | "compact";
}

export const VerifiedHandshakeCard = ({
  rmName,
  rmImage,
  rmRole,
  status = "pre-contact",
  onDismiss,
  variant = "default",
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
      <div
        className={cn(
          "relative bg-[#FFF8E1] border border-secondary/30 rounded-lg",
          variant === "compact" ? "p-3 mb-3" : "p-4 mb-4"
        )}
      >
        {onDismiss && (
          <button
            type="button"
            aria-label="Dismiss NoBroker guide card"
            className="nb-card-close"
            onClick={onDismiss}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <div
          className={cn(
            "flex items-center justify-between gap-3",
            onDismiss ? "pr-8" : "pr-2",
            variant === "compact" ? "mb-2" : "mb-3"
          )}
        >
          <h3 className="text-sm font-semibold leading-tight text-foreground">
            Your NoBroker Guide
          </h3>
          <button
            onClick={() => setShowInfoModal(true)}
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-secondary/40 px-2 py-1 text-[11px] font-semibold text-secondary hover:bg-secondary/10"
          >
            <Info className="h-3 w-3" />
            What does Verified mean?
          </button>
        </div>

        <div
          className={cn(
            "flex items-start gap-4 bg-white rounded-lg",
            variant === "compact" ? "p-3 mb-3" : "p-4 mb-4"
          )}
        >
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
          <div className={cn("space-y-3", variant === "compact" && "space-y-2.5")}>
            <p className="text-sm text-muted-foreground">
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

        <div
          className={cn(
            "border-t border-secondary/20",
            variant === "compact" ? "mt-3 pt-3" : "mt-4 pt-4"
          )}
        >
          <p className="text-xs text-muted-foreground">
            We only contact you through verified NoBroker representatives. You'll
            always see who's reaching out before they do.
          </p>
        </div>
      </div>

      <DialogNoBroker open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContentNoBroker>
          <DialogHeaderNoBroker className="gap-3">
            <DialogTitleNoBroker className="flex items-center gap-2 text-base font-semibold">
              <ShieldCheck className="h-5 w-5 text-success" />
              Verified NoBroker Guide
            </DialogTitleNoBroker>
            <DialogDescriptionNoBroker asChild>
              <div className="space-y-3 text-left text-sm text-muted-foreground">
                <p>
                  All NoBroker Guides go through a rigorous verification process to
                  ensure your safety and trust.
                </p>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    What makes them verified:
                  </p>
                  <ul className="mt-2 list-disc list-inside space-y-1.5 text-sm">
                    <li>Background checked and ID verified</li>
                    <li>Trained on NoBroker policies and ethics</li>
                    <li>Official company contact numbers only</li>
                    <li>Real-time performance monitoring</li>
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground/90">
                  You can always verify their identity before engaging. We never ask
                  for sensitive information over unofficial channels.
                </p>
              </div>
            </DialogDescriptionNoBroker>
          </DialogHeaderNoBroker>
        </DialogContentNoBroker>
      </DialogNoBroker>
    </>
  );
};
