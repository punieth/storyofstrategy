import { Bell, Building2, Clock, MessageCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@components/razorpay/ui/button";
import { ConsentModal } from "../components/ConsentModal";
import { Screen } from "../components/Screen";


const Index = () => {
  const [showConsent, setShowConsent] = useState(false);

  const features = [
    {
      icon: Clock,
      title: "Quiet Mode",
      description: "Control when and how we contact you about your listings",
      link: "/listings",
    },
    {
      icon: Users,
      title: "Verified Handshake",
      description: "See who's calling before you answer - verified NoBroker team only",
      link: "/handshake",
    },
    {
      icon: MessageCircle,
      title: "Weekly Digest",
      description: "Get property performance summaries on WhatsApp",
      link: "/digest",
    },
    {
      icon: Bell,
      title: "Preferences",
      description: "Customize your communication and call window settings",
      link: "/preferences",
    },
  ];

  return (
    <>
      <Screen title="For Property Owners">
        <div className="py-6">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <Building2 className="h-16 w-16 mx-auto mb-4 text-accent" />
            <h1 className="text-2xl font-bold mb-2">
              Manage Your Property,<br />Your Way
            </h1>
            <p className="text-meta">
              NRI-friendly features designed for property owners who value control and peace of mind
            </p>
          </div>

          {/* Features Grid */}
          <div className="space-y-4 mb-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  to={feature.link}
                  className="block bg-card rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-meta">{feature.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="bg-muted rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">Ready to list your property?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join thousands of NRI owners managing properties stress-free
            </p>
            <Button variant="cta" className="w-full" onClick={() => setShowConsent(true)}>
              GET STARTED
            </Button>
          </div>
        </div>
      </Screen>

      <ConsentModal 
        isOpen={showConsent} 
        onClose={() => setShowConsent(false)}
        isNRI={true}
      />
    </>
  );
};

export default Index;
