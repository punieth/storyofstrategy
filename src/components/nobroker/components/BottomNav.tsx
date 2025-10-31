import { Home, Building2, Heart, Crown, List } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const navItems = [
  { icon: Home, label: "NoBroker", path: "/" },
  { icon: Building2, label: "Property", path: "/property" },
  { icon: Heart, label: "Shortlist", path: "/shortlist" },
  { icon: Crown, label: "Plans", path: "/plans" },
  { icon: List, label: "My Listings", path: "/listings" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive ? "text-accent" : "text-meta"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
