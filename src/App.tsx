// src/App.tsx (hoặc file routing chính của bạn)
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import About from "./components/public/components/page/about";
import Leaderboard from "./components/public/components/page/leader-board";
import Challenges from "./components/public/components/page/challenges/Challenges";
import ChallengeMainPage from "./components/public/components/page/challenges/detail/ChallengeMainPage";
import ChallengePracticePage from "./components/public/components/page/challenges/detail/ChallengePracticePage"; 
import ChallengeResultPage from "./components/public/components/page/challenges/detail/ChallengeResultPage";
import Practice from "./components/public/components/page/practice";
import Public from "./components/public";
import HomePage from "./components/public/components/page/home/home";
import Profile from "./components/public/components/page/account/profile";
import Account from "./components/public/components/page/account";
import PracticeHistory from "./components/public/components/page/practice/components/history";
import Conversation from "./components/public/components/page/conversations/conversation";

import AdminProtectedRoute from "./components/AdminProtectedRoute"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          {/* Path Public */}
          <Route path="/" element={<Public />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="practice" element={<Practice />} />
            <Route path="practice/history" element={<PracticeHistory />} />
            <Route path="conversation" element={<Conversation />} />
            <Route path="challenges" element={<Challenges />} /> 
            <Route path="/challenges/detail/:challengeId" element={<ChallengeMainPage />} />
            <Route path="/challenges/:challengeId/practice/:exerciseId" element={<ChallengePracticePage />} />
            <Route path="/challenges/:challengeId/result/:score" element={<ChallengeResultPage />} />
            <Route path="challenges/:slug" element={<ChallengeMainPage />} />
            <Route path="leader-board" element={<Leaderboard />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<Account />} />

          {/* Path admin được bảo vệ */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <Admin />
              </AdminProtectedRoute>
            }
          />

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