import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import Preferences from "./pages/Preferences";
import WeeklyDigest from "./pages/WeeklyDigest";
import VerifiedHandshake from "./pages/VerifiedHandshake";
import Property from "./pages/Property";
import Shortlist from "./pages/Shortlist";
import Plans from "./pages/Plans";
import NotFound from "./pages/NotFound";
import { Toaster } from "@components/razorpay/ui/toaster";
import { TooltipProvider } from "@components/razorpay/ui/tooltip";
import { Toaster as Sonner } from "@components/razorpay/ui/sonnernobroker";

const queryClient = new QueryClient();

interface AppProps {
  basename?: string;
  embedded?: boolean;
}

const App = ({ basename = "/", embedded = false }: AppProps) => {
  const Router = embedded ? MemoryRouter : BrowserRouter;
  const routerProps: any = embedded ? { initialEntries: ['/'] } : { basename };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router {...routerProps}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/digest" element={<WeeklyDigest />} />
              <Route path="/handshake" element={<VerifiedHandshake />} />
              <Route path="/property" element={<Property />} />
              <Route path="/shortlist" element={<Shortlist />} />
              <Route path="/plans" element={<Plans />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;