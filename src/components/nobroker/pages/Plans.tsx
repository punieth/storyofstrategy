import { Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Screen } from "../components/Screen";

const Plans = () => {
  const navigate = useNavigate();

  return (
    <Screen
      title="Premium Plans"
      onBack={() => navigate(-1)}
    >
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <Crown className="h-16 w-16 text-meta" />
        <h2 className="text-xl font-semibold">Premium Plans</h2>
        <p className="text-meta">Upgrade for better visibility</p>
      </div>
    </Screen>
  );
};

export default Plans;
