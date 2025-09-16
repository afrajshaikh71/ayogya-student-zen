import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { User, UserCheck, Users } from "lucide-react";
import ayogyaLogo from "@/assets/ayogya-logo.jpg";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen gradient-primary flex flex-col items-center justify-center px-6 text-center page-transition">
      <div className="mb-8 animate-in slide-in-from-top duration-1000">
        <img 
          src={ayogyaLogo} 
          alt="Ayogya Logo" 
          className="w-24 h-24 mx-auto mb-4 rounded-2xl shadow-large"
        />
        <h1 className="text-4xl font-bold text-white mb-2">Ayogya</h1>
        <p className="text-xl text-white/90 font-light mb-2">
          Your trusted companion for student mental wellness
        </p>
        <p className="text-sm text-white/80 mt-2 max-w-sm mx-auto">
          Track your mood, talk to AI, connect with counsellors & peers
        </p>
      </div>

      <div className="w-full max-w-xs space-y-4 animate-in slide-in-from-bottom duration-1000 delay-300">
        <Button
          onClick={() => navigate("/student-home")}
          className="w-full bg-white text-primary hover:bg-white/90 shadow-medium py-6 rounded-xl font-medium text-lg"
        >
          <User className="mr-3 h-6 w-6" />
          Login as Student
        </Button>

        <Button
          onClick={() => navigate("/counsellor-home")}
          className="w-full bg-white text-primary hover:bg-white/90 shadow-medium py-6 rounded-xl font-medium text-lg"
        >
          <UserCheck className="mr-3 h-6 w-6" />
          Login as Counsellor
        </Button>

        <Button
          onClick={() => navigate("/student-home")}
          variant="ghost"
          className="w-full text-white hover:bg-white/20 py-6 rounded-xl font-medium text-lg"
        >
          <Users className="mr-3 h-6 w-6" />
          Continue as Guest
        </Button>
      </div>

      <div className="mt-12 text-white/70 text-sm animate-in fade-in duration-1000 delay-700">
        <p>Safe • Confidential • Supportive</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;