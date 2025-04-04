import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import About from "./components/public/components/page/about";
import Leaderboard from "./components/public/components/page/leader-board";
import Challenges from "./components/public/components/page/challenges";
import Practice from "./components/public/components/page/practice";
import Public from "./components/public";
import HomePage from "./components/public/components/page/home/home";
import ChallengeDetail from "./components/public/components/page/challenges/detail";
import Profile from "./components/public/components/page/account/profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          {/* Path Public */}
          <Route path="/" element={<Index />} />
          <Route path="/public" element={<Public />}>
            <Route path="home" element={<HomePage />} />
            <Route path="practice" element={<Practice />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="challenges/:slug" element={<ChallengeDetail />} />
            <Route path="leader-board" element={<Leaderboard />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Path admin */}
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
