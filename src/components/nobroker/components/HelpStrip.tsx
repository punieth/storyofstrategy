import { MessageCircle } from "lucide-react";

interface HelpStripProps {
  text: string;
}

export const HelpStrip = ({ text }: HelpStripProps) => {
  return (
    <div className="nb-help-strip">
      <div className="nb-help-strip__inner">
        <MessageCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <p className="nb-help-strip__text">{text}</p>
      </div>
    </div>
  );
};
