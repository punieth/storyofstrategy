import { MessageCircle } from "lucide-react";

interface HelpStripProps {
  text: string;
}

export const HelpStrip = ({ text }: HelpStripProps) => {
  return (
    <div className="bg-muted border-t border-border py-3 px-4 mb-16">
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <MessageCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
};
