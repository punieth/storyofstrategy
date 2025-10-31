import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Screen } from "../components/Screen";

const Shortlist = () => {
  const navigate = useNavigate();

  return (
    <Screen
      title="Shortlisted Properties"
      onBack={() => navigate(-1)}
    >
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <Heart className="h-16 w-16 text-meta" />
        <h2 className="text-xl font-semibold">Your Shortlist</h2>
        <p className="text-meta">Save your favorite properties here</p>
      </div>
    </Screen>
  );
};

export default Shortlist;
