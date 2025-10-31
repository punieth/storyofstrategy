import type { MouseEvent } from "react";
import { Eye, Heart, X } from "lucide-react";
import { Link } from "react-router-dom";

interface WeeklyDigestCardProps {
  views: number;
  shortlists: number;
  onDismiss?: () => void;
}

export const WeeklyDigestCard = ({ views, shortlists, onDismiss }: WeeklyDigestCardProps) => {
  const handleDismiss = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onDismiss?.();
  };

  return (
    <Link to="/digest" className="block">
      <article className="nb-weekly-card">
        {onDismiss && (
          <button
            type="button"
            aria-label="Dismiss weekly digest card"
            className="nb-card-close"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <header className="nb-weekly-card__header">
          <div className="nb-weekly-card__title">
            <span className="nb-weekly-card__label">
              <Eye className="h-3.5 w-3.5" />
              Weekly Digest
            </span>
            <h4>Your Whitefield 2BHK</h4>
            <p>Last 7 days • Updated 2 hrs ago</p>
          </div>
          <span className="nb-weekly-card__badge">Performance snapshot</span>
        </header>

        <section className="nb-weekly-card__metrics">
          <div className="nb-weekly-card__metric nb-weekly-card__metric--views">
            <div>
              <p>Views</p>
              <strong>{views}</strong>
            </div>
            <span>
              <Eye className="h-4 w-4" />
            </span>
          </div>
          <div className="nb-weekly-card__metric nb-weekly-card__metric--shortlists">
            <div>
              <p>Shortlists</p>
              <strong>{shortlists}</strong>
            </div>
            <span>
              <Heart className="h-4 w-4" />
            </span>
          </div>
        </section>

        <footer className="nb-weekly-card__footer">
          <strong>Tip:</strong> Listings with refreshed photos get 2× more enquiries. Add a balcony photo now.
        </footer>
      </article>
    </Link>
  );
};
