import { useNavigate } from "react-router-dom";
import { useAppNavigation } from "@/hooks/useNavigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageCircle, 
  Calendar, 
  Users, 
  BookOpen, 
  Heart, 
  Trophy,
  Bell,
  User
} from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const StudentHome = () => {
  const navigate = useNavigate();
  const { goBack } = useAppNavigation();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const quickActions = [
    {
      title: "AI Chat Support",
      description: "Talk to our caring AI assistant",
      icon: MessageCircle,
      route: "/chatbot",
      gradientClass: "bg-gradient-to-r from-[#A78BFA] to-[#7C3AED]"
    },
    {
      title: "Book Counsellor",
      description: "Schedule with professional counsellors",
      icon: Calendar,
      route: "/booking",
      gradientClass: "bg-gradient-to-r from-[#34D399] to-[#10B981]"
    },
    {
      title: "Peer Support",
      description: "Connect with fellow students",
      icon: Users,
      route: "/forum",
      gradientClass: "bg-gradient-to-r from-[#F472B6] to-[#EC4899]"
    },
    {
      title: "Resources",
      description: "Helpful guides and materials",
      icon: BookOpen,
      route: "/resources",
      gradientClass: "bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
    },
    {
      title: "Mood Tracker",
      description: "Track your emotional wellbeing",
      icon: Heart,
      route: "/mood",
      gradientClass: "bg-gradient-to-r from-[#FBBF24] to-[#F59E0B]"
    },
    {
      title: "Wellness Challenges",
      description: "Fun daily mental health activities",
      icon: Trophy,
      route: "/challenges",
      gradientClass: "bg-gradient-to-r from-[#22C55E] to-[#0EA5E9]"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-primary/5 page-transition">
      {/* Header */}
      <div className="gradient-primary px-6 py-8 rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
            <p className="text-white/90">How are you feeling today?</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-2">
              <User className="h-5 w-5" />
            </Button>
            <HamburgerMenu />
          </div>
        </div>

        {/* Quick Mood Check */}
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-1">Quick Mood Check</h3>
            <p className="text-white/80 text-xs mb-3">Tap an emoji to log your current mood</p>
            <div className="flex justify-between gap-2">
              <Button 
                size="sm" 
                className="bg-mood-happy hover:bg-mood-happy/80 text-white rounded-full px-3 py-2 flex-1"
                onClick={() => navigate("/mood")}
              >
                😊
              </Button>
              <Button 
                size="sm" 
                className="bg-mood-neutral hover:bg-mood-neutral/80 text-white rounded-full px-3 py-2 flex-1"
                onClick={() => navigate("/mood")}
              >
                😐
              </Button>
              <Button 
                size="sm" 
                className="bg-mood-sad hover:bg-mood-sad/80 text-white rounded-full px-3 py-2 flex-1"
                onClick={() => navigate("/mood")}
              >
                😢
              </Button>
              <Button 
                size="sm" 
                className="bg-mood-anxious hover:bg-mood-anxious/80 text-white rounded-full px-3 py-2 flex-1"
                onClick={() => navigate("/mood")}
              >
                😰
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Main Actions Grid */}
      <div id="wellness-hub" className="px-6 py-4">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Your Wellness Hub</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="card-hover cursor-pointer border-0 shadow-soft"
              onClick={() => navigate(action.route)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-2xl ${action.gradientClass} flex items-center justify-center mx-auto mb-3 shadow-medium`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-sm mb-1 text-foreground">{action.title}</h3>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Wellness Streak & AI Recommendations */}
      <div className="px-6 py-4 space-y-4">
        <Card className="bg-gradient-to-r from-accent to-primary border-0">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🔥</span>
              <span className="text-white font-bold text-lg">7-Day Streak!</span>
            </div>
            <p className="text-white/90 text-sm">Keep up your wellness journey</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🤖</span>
              <h3 className="font-semibold text-gray-800">Wellness Recommendation</h3>
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

      {/* Track Your Wellness Section */}
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Track Your Wellness</h2>
        
        {/* Emergency Support */}
        <Card className="mt-4 bg-destructive/10 border-destructive/20">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-destructive mb-2">Need Immediate Support?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              If you're having thoughts of self-harm, please reach out immediately.
            </p>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => navigate("/chatbot")}
            >
              Get Help Now - Call 112
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div id="faq">
        <FAQSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentHome;