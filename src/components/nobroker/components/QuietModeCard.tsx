import { Clock, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface QuietModeCardProps {
  hoursLeft: number;
  nextDigestDay: string;
  nextDigestTime: string;
}

export const QuietModeCard = ({ hoursLeft, nextDigestDay, nextDigestTime }: QuietModeCardProps) => {
  return (
    <div className="bg-quiet-mode border border-quiet-mode-foreground/20 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-quiet-mode-foreground/10 rounded-full">
          <Clock className="h-5 w-5 text-quiet-mode-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-quiet-mode-foreground mb-1">
            Quiet Mode ON
          </h3>
          <p className="text-sm text-quiet-mode-foreground/80">
            No calls for {hoursLeft} hours. Next summary: {nextDigestDay} {nextDigestTime}
          </p>
          <Link 
            to="/preferences" 
            className="inline-flex items-center gap-1 text-sm font-medium text-quiet-mode-foreground hover:underline mt-2"
          >
            <Settings className="h-3 w-3" />
            Edit Preferences
          </Link>
        </div>
      </div>
    </div>
  );
};
