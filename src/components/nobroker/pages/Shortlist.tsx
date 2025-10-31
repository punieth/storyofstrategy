import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { Heart } from "lucide-react";

const Shortlist = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Shortlisted Properties" />
      
      <main className="pt-16 px-4 max-w-md mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary mb-4 mt-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="py-8 text-center">
          <Heart className="h-16 w-16 mx-auto mb-4 text-meta" />
          <h2 className="text-xl font-semibold mb-2">Your Shortlist</h2>
          <p className="text-meta">Save your favorite properties here</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Shortlist;
