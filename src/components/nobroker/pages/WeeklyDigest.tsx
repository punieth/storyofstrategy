import { Eye, Heart, Lightbulb, ExternalLink, ImagePlus, Settings, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { Button } from "@components/razorpay/ui/button";

const WeeklyDigest = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Weekly Summary" />
      
      <main className="pt-16 px-4 max-w-md mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary mb-4 mt-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="py-4 space-y-4">
          {/* WhatsApp-style message card */}
          <div className="bg-success/10 rounded-lg p-4 border-l-4 border-success">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center font-bold text-sm">
                NB
              </div>
              <div>
                <p className="font-semibold text-sm">NoBroker Weekly Update</p>
                <p className="text-xs text-meta">Your property performance</p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 mb-3">
              <h3 className="font-semibold mb-1">Your Whitefield 2BHK</h3>
              <p className="text-sm text-meta mb-4">Weekly Summary</p>

              <div className="flex gap-8 mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-meta">Views</p>
                    <p className="text-2xl font-bold">18</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-meta">Shortlists</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-3 flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  <span className="font-semibold">Tip:</span> Add a balcony photo to get more engagement. Properties with 5+ photos get 2x more shortlists.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                variant="cta" 
                className="w-full gap-2" 
                size="sm"
                onClick={() => navigate('/listings?state=quiet-off')}
              >
                <ExternalLink className="h-4 w-4" />
                VIEW LISTING
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="gap-2" 
                  size="sm"
                  onClick={() => navigate('/listings?state=quiet-off')}
                >
                  <ImagePlus className="h-4 w-4" />
                  Edit Photos
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2" 
                  size="sm"
                  onClick={() => navigate('/preferences')}
                >
                  <Settings className="h-4 w-4" />
                  Change Quiet Mode
                </Button>
              </div>
            </div>
          </div>

          {/* Performance comparison */}
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-3">How You're Doing</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-meta">Your Views</span>
                  <span className="font-semibold">18</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[45%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-meta">Similar Properties Avg.</span>
                  <span className="font-semibold">40</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-full" />
                </div>
              </div>
            </div>
            <p className="text-xs text-meta mt-3">
              Your listing is getting 45% of average traffic. Consider improving your photos and description.
            </p>
          </div>

          {/* Next steps */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-semibold mb-3">Boost Your Listing</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Add 3 more high-quality photos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Update your availability calendar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Consider going Premium for 3x visibility</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default WeeklyDigest;
