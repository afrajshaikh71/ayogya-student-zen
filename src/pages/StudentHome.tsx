import { useNavigate } from "react-router-dom";
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

const StudentHome = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "AI Chat Support",
      description: "Talk to our caring AI assistant",
      icon: MessageCircle,
      route: "/chatbot",
      color: "from-primary to-primary-light"
    },
    {
      title: "Book Counsellor",
      description: "Schedule with professional counsellors",
      icon: Calendar,
      route: "/booking",
      color: "from-success to-success-light"
    },
    {
      title: "Peer Support",
      description: "Connect with fellow students",
      icon: Users,
      route: "/forum",
      color: "from-accent to-accent-light"
    },
    {
      title: "Resources",
      description: "Helpful guides and materials",
      icon: BookOpen,
      route: "/resources",
      color: "from-primary to-success"
    },
    {
      title: "Mood Tracker",
      description: "Track your emotional wellbeing",
      icon: Heart,
      route: "/mood",
      color: "from-accent to-primary"
    },
    {
      title: "Wellness Challenges",
      description: "Fun daily mental health activities",
      icon: Trophy,
      route: "/challenges",
      color: "from-success to-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
          </div>
        </div>

        {/* Quick Mood Check */}
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4">
            <p className="text-white/90 text-sm mb-3">Quick mood check:</p>
            <div className="flex justify-between">
              <Button 
                size="sm" 
                className="bg-mood-happy hover:bg-mood-happy/80 text-white rounded-full px-4"
                onClick={() => navigate("/mood")}
              >
                😊 Happy
              </Button>
              <Button 
                size="sm" 
                className="bg-mood-neutral hover:bg-mood-neutral/80 text-white rounded-full px-4"
                onClick={() => navigate("/mood")}
              >
                😐 Okay
              </Button>
              <Button 
                size="sm" 
                className="bg-mood-sad hover:bg-mood-sad/80 text-white rounded-full px-4"
                onClick={() => navigate("/mood")}
              >
                😢 Sad
              </Button>
              <Button 
                size="sm" 
                className="bg-mood-anxious hover:bg-mood-anxious/80 text-white rounded-full px-4"
                onClick={() => navigate("/mood")}
              >
                😰 Anxious
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions Grid */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Your Wellness Hub</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="card-hover cursor-pointer border-0 shadow-soft"
              onClick={() => navigate(action.route)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Support */}
        <Card className="mt-8 bg-destructive/10 border-destructive/20">
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
    </div>
  );
};

export default StudentHome;