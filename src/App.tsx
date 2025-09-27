import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import WelcomeScreen from "./pages/WelcomeScreen";
import StudentHome from "./pages/StudentHome";
import ChatbotScreen from "./pages/ChatbotScreen";
import CounsellorBooking from "./pages/CounsellorBooking";
import CounsellorSchedule from "./pages/CounsellorSchedule";
import CounsellorMessages from "./pages/CounsellorMessages";
import CounsellorProgress from "./pages/CounsellorProgress";
import CounsellorGroups from "./pages/CounsellorGroups";
import CounsellorHome from "./pages/CounsellorHome";
import PeerSupportForum from "./pages/PeerSupportForum";
import ResourceHub from "./pages/ResourceHub";
import MoodTracking from "./pages/MoodTracking";
import WellnessChallenges from "./pages/WellnessChallenges";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ScreeningTools from "./pages/ScreeningTools"; // ✅ New page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public */}
            <Route path="/" element={<WelcomeScreen />} />

            {/* Student */}
            <Route path="/student-home" element={<StudentHome />} />
            <Route path="/chatbot" element={<ChatbotScreen />} />
            <Route path="/booking" element={<CounsellorBooking />} />
            <Route path="/forum" element={<PeerSupportForum />} />
            <Route path="/resources" element={<ResourceHub />} />
            <Route path="/mood" element={<MoodTracking />} />
            <Route path="/screening-tools" element={<ScreeningTools />} /> {/* ✅ Added */}
            <Route path="/challenges" element={<WellnessChallenges />} />

            {/* Counsellor */}
            <Route path="/counsellor-home" element={<CounsellorHome />} />
            <Route path="/counsellor-schedule" element={<CounsellorSchedule />} />
            <Route path="/counsellor-messages" element={<CounsellorMessages />} />
            <Route path="/counsellor-progress" element={<CounsellorProgress />} />
            <Route path="/counsellor-groups" element={<CounsellorGroups />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
