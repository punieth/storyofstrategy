import { Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface WeeklyDigestCardProps {
  views: number;
  shortlists: number;
}

export const WeeklyDigestCard = ({ views, shortlists }: WeeklyDigestCardProps) => {
  return (
    <Link to="/digest">
      <div className="bg-card border border-border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow cursor-pointer">
        <h4 className="font-semibold text-sm mb-3">Weekly Digest</h4>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-meta" />
            <div>
              <p className="text-xs text-meta">Views</p>
              <p className="text-lg font-bold">{views}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-meta" />
            <div>
              <p className="text-xs text-meta">Shortlists</p>
              <p className="text-lg font-bold">{shortlists > 0 ? shortlists : "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
