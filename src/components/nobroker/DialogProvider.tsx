import { createContext, useContext, useState } from "react";

interface DialogContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const NoBrokerDialogContext = createContext<DialogContextValue | undefined>(undefined);

export const NoBrokerDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <NoBrokerDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </NoBrokerDialogContext.Provider>
  );
};

export const useNoBrokerDialog = () => {
  const context = useContext(NoBrokerDialogContext);
  if (!context) {
    throw new Error("useNoBrokerDialog must be used within NoBrokerDialogProvider");
  }
  return context;
};
