import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Screen } from "../components/Screen";

const Property = () => {
  const navigate = useNavigate();

  return (
    <Screen
      title="Property Search"
      onBack={() => navigate(-1)}
    >
      <div className="nb-placeholder">
        <Search className="h-16 w-16 text-meta" />
        <h2 className="text-xl font-semibold">Property Search</h2>
        <p className="text-meta">Browse properties coming soon</p>
      </div>
    </Screen>
  );
};

export default Property;
