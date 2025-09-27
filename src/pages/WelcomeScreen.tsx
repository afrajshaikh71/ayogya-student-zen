import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// ✅ Logo import
import logo from "../assets/arogya-logo.png";

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-500 px-4">
      {/* Logo inside a square box */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src={logo}
            alt="Arogya Logo"
            className="w-20 h-20 object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-white mb-2">Arogya</h1>
      <p className="text-white/90 mb-8 text-center max-w-md">
        Your trusted companion for student mental wellness. <br />
        Track your mood, talk to AI, connect with counsellors & peers.
      </p>

      {/* Buttons */}
      <div className="w-full max-w-xs space-y-3">
        <Button
          onClick={() => navigate("/student-home")}
          className="w-full bg-white text-blue-600 hover:bg-gray-100"
        >
          Login as Student
        </Button>

        <Button
          onClick={() => navigate("/counsellor-home")}
          className="w-full bg-white text-blue-600 hover:bg-gray-100"
        >
          Login as Counsellor
        </Button>
        

        <Button
          onClick={() => navigate("/admin-dashboard")}
          className="w-full bg-white text-blue-600 hover:bg-gray-100"
        >
          Login as Admin
        </Button>

        {/* ✅ Guest button proper visible now */}
        <Button
          onClick={() => navigate("/student-home")}
          className="w-full border border-white text-blue-600 bg-white hover:bg-gray-100"
        >
          Login as Anonymous (Student)
        </Button>
      </div>

      {/* Footer */}
      <p className="mt-6 text-white/80 text-sm">
        Safe • Confidential • Supportive
      </p>
    </div>
  );
};

export default WelcomeScreen;
