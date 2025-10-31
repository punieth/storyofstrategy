import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "../lib/utils";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface ScreenProps {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  backLabel?: string;
  afterMain?: ReactNode;
  contentClassName?: string;
  hideBottomNav?: boolean;
}

export const Screen = ({
  title,
  children,
  onBack,
  backLabel = "Back",
  afterMain,
  contentClassName,
  hideBottomNav = false,
}: ScreenProps) => {
  return (
    <div className="nb-screen">
      <Header title={title} />

      <main className={cn("nb-main", contentClassName)}>
        {onBack && (
          <button onClick={onBack} className="nb-back-button">
            <ArrowLeft className="h-4 w-4" />
            <span>{backLabel}</span>
          </button>
        )}
        {children}
      </main>

      {afterMain && <div className="nb-after-main">{afterMain}</div>}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};
