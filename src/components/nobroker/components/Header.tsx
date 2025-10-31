import { Menu, Bell } from "lucide-react";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="nb-header bg-primary text-primary-foreground shadow-md z-50">
      <div className="mx-auto flex h-14 w-full items-center justify-between px-4">
        <button className="p-2 -ml-2">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-base font-semibold">{title}</h1>
        <button className="p-2 -mr-2">
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
