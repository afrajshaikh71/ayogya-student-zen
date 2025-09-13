import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import StudentHome from "./pages/StudentHome";
import ChatbotScreen from "./pages/ChatbotScreen";
import CounsellorBooking from "./pages/CounsellorBooking";
import CounsellorHome from "./pages/CounsellorHome";
import PeerSupportForum from "./pages/PeerSupportForum";
import ResourceHub from "./pages/ResourceHub";
import MoodTracking from "./pages/MoodTracking";
import WellnessChallenges from "./pages/WellnessChallenges";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="mobile-container">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/student-home" element={<StudentHome />} />
            <Route path="/chatbot" element={<ChatbotScreen />} />
            <Route path="/booking" element={<CounsellorBooking />} />
            <Route path="/counsellor-home" element={<CounsellorHome />} />
            <Route path="/forum" element={<PeerSupportForum />} />
            <Route path="/resources" element={<ResourceHub />} />
            <Route path="/mood" element={<MoodTracking />} />
            <Route path="/challenges" element={<WellnessChallenges />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;