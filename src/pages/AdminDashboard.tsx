import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Calendar, MessageCircle, TrendingUp, AlertTriangle, Heart } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Sample data for admin dashboard
  const stats = {
    activeStudents: 1247,
    totalBookings: 89,
    avgMoodTrend: 6.8,
    crisisAlerts: 3,
    forumPosts: 156,
    completedChallenges: 2840
  };

  const recentAlerts = [
    {
      id: 1,
      student: "Student #1247",
      type: "Crisis Detection",
      message: "Self-harm keywords detected in chat",
      timestamp: "2 minutes ago",
      status: "pending"
    },
    {
      id: 2,
      student: "Student #0892",
      type: "Mood Alert",
      message: "Consistently low mood for 5 days",
      timestamp: "1 hour ago",
      status: "resolved"
    },
    {
      id: 3,
      student: "Student #1156",
      type: "Crisis Detection",
      message: "Emergency support requested",
      timestamp: "3 hours ago",
      status: "resolved"
    }
  ];

  const topIssues = [
    { issue: "Academic Stress", count: 234, percentage: 35 },
    { issue: "Career Anxiety", count: 178, percentage: 27 },
    { issue: "Relationship Issues", count: 123, percentage: 18 },
    { issue: "Family Problems", count: 89, percentage: 13 },
    { issue: "Self Esteem", count: 45, percentage: 7 }
  ];

  const moodTrendData = [
    { day: "Mon", mood: 7.2 },
    { day: "Tue", mood: 6.8 },
    { day: "Wed", mood: 6.5 },
    { day: "Thu", mood: 6.9 },
    { day: "Fri", mood: 7.1 },
    { day: "Sat", mood: 7.8 },
    { day: "Sun", mood: 7.5 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 p-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/90 text-sm">Mental health insights & management</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">{stats.activeStudents}</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-8 w-8 text-success" />
              </div>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <div className="text-sm text-muted-foreground">Total Bookings</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <div className="text-2xl font-bold">{stats.avgMoodTrend}/10</div>
              <div className="text-sm text-muted-foreground">Avg Mood Trend</div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <div className="text-2xl font-bold text-destructive">{stats.crisisAlerts}</div>
              <div className="text-sm text-muted-foreground">Crisis Alerts</div>
            </CardContent>
          </Card>
        </div>

        {/* Crisis Alerts */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Recent Crisis Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{alert.student}</span>
                      <Badge 
                        variant={alert.status === "pending" ? "destructive" : "secondary"}
                      >
                        {alert.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                </div>
                {alert.status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="destructive">
                      Respond Now
                    </Button>
                    <Button size="sm" variant="outline">
                      Assign Counsellor
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Mood Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Mood Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {moodTrendData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(day.mood / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{day.mood}/10</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Top Mental Health Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topIssues.map((issue, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{issue.issue}</span>
                    <span className="text-sm text-muted-foreground">{issue.count} cases</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${issue.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              Export Reports
            </Button>
            <Button variant="outline" className="h-12">
              Counsellor Schedule
            </Button>
            <Button variant="outline" className="h-12">
              Send Notification
            </Button>
            <Button variant="outline" className="h-12">
              User Management
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="font-medium">System Status: Healthy</span>
            </div>
            <p className="text-sm text-muted-foreground">
              All services running normally. Last backup: 2 hours ago.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;