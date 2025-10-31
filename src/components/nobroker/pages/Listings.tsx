import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { ConsentModal } from "../components/ConsentModal";
import { HelpStrip } from "../components/HelpStrip";
import { PropertyCard } from "../components/PropertyCard";
import { VerifiedHandshakeCard } from "../components/VerifiedHandshakeSheet";
import { WeeklyDigestCard } from "../components/WeeklyDigestCard";

const Listings = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get state from URL params: quiet-on, quiet-ending-soon, quiet-off
  const state = searchParams.get('state') || 'quiet-on';
  
  // Auto-transition logic
  useEffect(() => {
    if (state === 'quiet-on') {
      const timer = setTimeout(() => {
        setSearchParams({ state: 'quiet-ending-soon' });
      }, 3000);
      return () => clearTimeout(timer);
    } else if (state === 'quiet-ending-soon') {
      const timer = setTimeout(() => {
        setSearchParams({ state: 'quiet-off' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state, setSearchParams]);

  const isQuietMode = state === 'quiet-on' || state === 'quiet-ending-soon';
  const isEndingSoon = state === 'quiet-ending-soon';
  const hoursLeft = isEndingSoon ? 8 : 72;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="My Listings" />
      
      <main className="pt-16 px-4 max-w-md mx-auto">
        <div className="py-4">
          {isQuietMode && (
            <div className="bg-quiet-mode border border-quiet-mode-foreground/20 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-quiet-mode-foreground/10 rounded-full">
                  <Clock className="h-5 w-5 text-quiet-mode-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-quiet-mode-foreground">
                      Quiet Mode ON
                    </h3>
                    {isEndingSoon && (
                      <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded">
                        ENDS IN {hoursLeft}H
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-quiet-mode-foreground/80">
                    No calls for {hoursLeft} hours. Next summary: Mon 10 AM IST
                  </p>
                  <button 
                    onClick={() => navigate('/preferences')}
                    className="text-sm font-medium text-quiet-mode-foreground hover:underline mt-2"
                  >
                    Edit Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {!isQuietMode && (
            <>
              <VerifiedHandshakeCard
                rmName="Priya Sharma"
                rmImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop"
                rmRole="Helps with listing verification"
                status="pre-contact"
              />
            </>
          )}

          <WeeklyDigestCard views={isQuietMode ? 0 : 18} shortlists={isQuietMode ? 0 : 2} />

          <div className="space-y-4">
            <PropertyCard
              title="2 BHK Apartment"
              location="Whitefield, Bangalore"
              image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop"
              status="active"
              views={18}
              rating={4.5}
            />

            <PropertyCard
              title="3 BHK Villa"
              location="Koramangala, Bangalore"
              image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop"
              status="inactive"
              views={8}
            />
          </div>

          <button 
            onClick={() => setShowConsent(true)}
            className="w-full mt-4 py-3 border-2 border-dashed border-border rounded-lg text-sm text-meta hover:border-accent hover:text-accent transition-colors"
          >
            + Add New Property
          </button>
        </div>
      </main>

      <HelpStrip text="Get help with your property listing. Our team is available 24/7." />
      <BottomNav />
      
      <ConsentModal 
        isOpen={showConsent} 
        onClose={() => setShowConsent(false)}
        isNRI={true}
      />
    </div>
  );
};

export default Listings;
