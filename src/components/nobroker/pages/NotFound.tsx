import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Screen } from "../components/Screen";
import { Button } from "@components/razorpay/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Screen title="Page Not Found" hideBottomNav contentClassName="justify-center text-center gap-6">
      <div className="flex flex-col items-center gap-3">
        <span className="text-4xl font-bold text-accent">404</span>
        <p className="text-meta">We couldn't find what you were looking for.</p>
        <Button variant="cta" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </Screen>
  );
};

export default NotFound;
