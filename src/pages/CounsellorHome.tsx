import { useNavigate } from "react-router-dom";
import { useAppNavigation } from "@/hooks/useNavigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  BarChart3,
  Bell,
  User,
  ArrowLeft
} from "lucide-react";

const CounsellorHome = () => {
  const navigate = useNavigate();
  const { goBack } = useAppNavigation();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const counsellorActions = [
    {
      title: "My Schedule",
      description: "View upcoming appointments",
      icon: Calendar,
      route: "/counsellor-schedule",
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Student Messages",
      description: "Chat with students",
      icon: MessageSquare,
      route: "/counsellor-messages",
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Student Progress",
      description: "Track wellness metrics",
      icon: BarChart3,
      route: "/student-progress",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Group Sessions",
      description: "Manage peer support groups",
      icon: Users,
      route: "/group-sessions",
      color: "from-pink-400 to-fuchsia-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-accent/5 page-transition">
      {/* Header */}
      <div className="gradient-primary px-6 py-8 rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:bg-white/20 p-2"
              onClick={goBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome, Dr. Sharma!</h1>
              <p className="text-white/90">Ready to support students today?</p>
            </div>
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

        {/* Quick Stats */}
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-white/80 text-xs">Today's Sessions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">48</div>
                <div className="text-white/80 text-xs">Active Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-white/80 text-xs">Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions Grid */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Your Dashboard</h2>
        <div className="grid grid-cols-2 gap-4">
          {counsellorActions.map((action, index) => (
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

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Session with Arjun completed</span>
                <span className="text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>New message from Priya</span>
                <span className="text-muted-foreground">4 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Weekly report generated</span>
                <span className="text-muted-foreground">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CounsellorHome;