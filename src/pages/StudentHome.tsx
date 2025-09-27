import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle,
  Calendar,
  Users,
  BookOpen,
  Trophy,
  Bell,
  User,
  ClipboardList, // ✅ fixed icon
} from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";
import Footer from "@/components/Footer";

const StudentHome = () => {
  const navigate = useNavigate();

  // Scroll top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const quickActions = [
    {
      title: "AI Chat Support",
      description: "Talk to our caring AI assistant",
      icon: MessageCircle,
      route: "/chatbot",
      gradientClass: "bg-gradient-chat",
    },
    {
      title: "Book Counsellor",
      description: "Schedule with professional counsellors",
      icon: Calendar,
      route: "/booking",
      gradientClass: "bg-gradient-booking",
    },
    {
      title: "Peer Support",
      description: "Connect with fellow students",
      icon: Users,
      route: "/forum",
      gradientClass: "bg-gradient-peer",
    },
    {
      title: "Resources",
      description: "Helpful guides and materials",
      icon: BookOpen,
      route: "/resources",
      gradientClass: "bg-gradient-resources",
    },
    {
      title: "Screening Tools", // ✅ Mood Tracker replaced
      description: "PHQ-9 & GAD-7 quick assessments",
      icon: ClipboardList,      // ✅ icon fixed
      route: "/screening-tools", // ✅ matches App.tsx
      gradientClass: "bg-gradient-screening", // ✅ gradient fixed
    },
    {
      title: "Wellness Challenges",
      description: "Daily habits for better wellbeing",
      icon: Trophy,
      route: "/challenges",
      gradientClass: "bg-gradient-challenges",
    },
  ];

  return (
    <div className="min-h-screen bg-background page-transition">
      {/* Header */}
      <div className="gradient-primary px-6 py-6 rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
            <p className="text-white/90">How are you feeling today?</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 p-2"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 p-2"
            >
              <User className="h-5 w-5" />
            </Button>
            <HamburgerMenu />
          </div>
        </div>

        {/* Quick Mood Check */}
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-1">Quick Mood Check</h3>
            <p className="text-white/80 text-xs mb-3">
              Tap an emoji to log your current mood
            </p>
            <div className="flex justify-between gap-2">
              {["😊", "😐", "😢", "😰", "🤩"].map((emoji, i) => (
                <Button
                  key={i}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-lg rounded-full flex-1"
                  onClick={() => navigate("/mood")}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wellness Hub */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-semibold mb-6 text-foreground">
          Your Wellness Hub
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="card-hover cursor-pointer border-0 shadow-soft h-full"
              onClick={() => navigate(action.route)}
            >
              <CardContent className="p-6 text-center flex flex-col justify-between h-full">
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${action.gradientClass} flex items-center justify-center mx-auto mb-4 shadow-medium`}
                >
                  <action.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="font-bold text-base mb-2 text-foreground">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Streak */}
      <div className="px-6">
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 border-0 text-white">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🔥</span>
              <span className="font-bold text-lg">7-Day Streak!</span>
            </div>
            <p className="text-sm">Keep up your wellness journey</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation */}
      <div className="px-6 mt-4">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🤖</span>
              <h3 className="font-semibold text-gray-800">
                Wellness Recommendation
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              You seem stressed before exams, try this relaxation exercise.
            </p>
            <Button size="sm" variant="outline" className="text-xs">
              Start 2-min Breathing Exercise
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Emergency */}
      <div className="px-6 mt-6">
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-destructive mb-2">
              Need Immediate Support?
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              If you're having thoughts of self-harm, please reach out
              immediately.
            </p>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => (window.location.href = "tel:112")}
            >
              Get Help Now – Call 112
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          How Arogya Helps You
        </h2>
        <div className="space-y-3">
          {[
            "What is AI Chat Support?",
            "How does the Counsellor Booking work?",
            "What is Peer Support?",
            "What will I find in the Resource Hub?",
            "What is the Psychological Screening?",
            "What are Wellness Challenges?",
            "How do AI-driven Wellness Recommendations work?",
            "What are Wellness Streaks & Rewards?",
          ].map((question, i) => (
            <details key={i} className="bg-secondary rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">
                {question}
              </summary>
              <p className="text-sm mt-2 text-muted-foreground">
                details coming soon...
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentHome;
