import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import StrawberryDetail from "./pages/StrawberryDetail";
import MulberryDetail from "./pages/MulberryDetail";
import RaspberryDetail from "./pages/RaspberryDetail";
import GoldenBerryDetail from "./pages/GoldenBerryDetail";
import { ReactLenis } from '@studio-freight/react-lenis';
import { LanguageProvider } from './context/LanguageContext';

import LanguageToggle from "./components/LanguageToggle";

import VisitorTracker from "./components/VisitorTracker";
import HiddenDashboard from "./pages/HiddenDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
          <Toaster />
          <Sonner />
          <VisitorTracker />
          <BrowserRouter>
            <ScrollToTop />
            <LanguageToggle />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/strawberries" element={<StrawberryDetail />} />
              <Route path="/mulberries" element={<MulberryDetail />} />
              <Route path="/raspberries" element={<RaspberryDetail />} />
              <Route path="/golden-berries" element={<GoldenBerryDetail />} />
              <Route path="/secret-dashboard" element={<HiddenDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ReactLenis>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
