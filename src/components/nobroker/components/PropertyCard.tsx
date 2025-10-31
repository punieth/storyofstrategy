import { Button } from "@components/razorpay/ui/button";
import { MapPin, Eye, Star } from "lucide-react";

interface PropertyCardProps {
  title: string;
  location: string;
  image: string;
  status: "active" | "inactive";
  views?: number;
  rating?: number;
}

export const PropertyCard = ({ title, location, image, status, views = 0, rating }: PropertyCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {status === "active" && (
          <span className="absolute top-3 right-3 bg-success text-success-foreground text-xs font-bold px-2 py-1 rounded">
            ACTIVE
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-base mb-1">{title}</h3>
        <div className="flex items-center gap-1 text-meta text-sm mb-3">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-meta mb-3">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{views} views</span>
          </div>
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="cta" className="flex-1" size="sm">
            GO PREMIUM
          </Button>
          <Button variant="teal" className="flex-1" size="sm">
            EDIT
          </Button>
        </div>
      </div>
    </div>
  );
};
