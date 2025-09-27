import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Users,
  Calendar,
  MessageCircle,
  TrendingUp,
  AlertTriangle,
  Heart,
  FileText,
  BarChart as BarChartIcon,
  Activity,
  ClipboardList,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Stats
  const stats = {
    activeStudents: 1247,
    totalBookings: 89,
    avgMoodTrend: 6.8,
    crisisAlerts: 3,
  };

  // Alerts
  const recentAlerts = [
    {
      id: 1,
      student: "Student #1247",
      message: "Self-harm keywords detected in chat",
      timestamp: "2 minutes ago",
      status: "pending",
    },
    {
      id: 2,
      student: "Student #0892",
      message: "Consistently low mood for 5 days",
      timestamp: "1 hour ago",
      status: "resolved",
    },
  ];

  // Issues
  const topIssues = [
    { issue: "Academic Stress", count: 234 },
    { issue: "Career Anxiety", count: 178 },
    { issue: "Relationship Issues", count: 123 },
    { issue: "Family Problems", count: 89 },
    { issue: "Self Esteem", count: 45 },
  ];

  // Weekly mood (line chart)
  const moodTrendData = [
    { day: "Mon", mood: 7.2 },
    { day: "Tue", mood: 6.8 },
    { day: "Wed", mood: 6.5 },
    { day: "Thu", mood: 6.9 },
    { day: "Fri", mood: 7.1 },
    { day: "Sat", mood: 7.8 },
    { day: "Sun", mood: 7.5 },
  ];

  // Institution Trends (bar chart)
  const institutionTrends = [
    { month: "Jan", active: 980, bookings: 72, crises: 5 },
    { month: "Feb", active: 1020, bookings: 89, crises: 4 },
    { month: "Mar", active: 1104, bookings: 95, crises: 6 },
    { month: "Apr", active: 1200, bookings: 110, crises: 3 },
  ];

  // Resource Usage (pie chart)
  const resourceUsage = [
    { name: "Videos", value: 430 },
    { name: "Audios", value: 289 },
    { name: "Guides", value: 150 },
    { name: "Forum Posts", value: 156 },
  ];
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899"];

  // Counsellor reports
  const counsellorReports = [
    { name: "Dr. Sharma", sessions: 45, avgRating: 4.8 },
    { name: "Dr. Mehta", sessions: 38, avgRating: 4.6 },
    { name: "Dr. Khan", sessions: 29, avgRating: 4.9 },
  ];

  const earlyWarnings = [
    "15 students show declining mood for 7+ days.",
    "Spike in anxiety logs during evenings.",
    "Increased sleep issues reported this week.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-primary/5 page-transition">
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
            <p className="text-white/90 text-sm">
              Mental health insights & management
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.activeStudents}</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <div className="text-sm text-muted-foreground">Bookings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.avgMoodTrend}/10</div>
              <div className="text-sm text-muted-foreground">Mood Avg</div>
            </CardContent>
          </Card>
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
              <div className="text-2xl font-bold text-destructive">
                {stats.crisisAlerts}
              </div>
              <div className="text-sm text-muted-foreground">Crisis Alerts</div>
            </CardContent>
          </Card>
        </div>

        {/* Crisis Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Recent Crisis Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="p-3 border rounded-lg mb-2">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{alert.student}</p>
                    <p className="text-sm text-muted-foreground">
                      {alert.message}
                    </p>
                  </div>
                  <Badge
                    variant={
                      alert.status === "pending" ? "destructive" : "secondary"
                    }
                  >
                    {alert.status}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {alert.timestamp}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Early Warnings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <Activity className="h-5 w-5" />
              Early Warning System
            </CardTitle>
          </CardHeader>
          <CardContent>
            {earlyWarnings.map((w, i) => (
              <div key={i} className="p-2 bg-yellow-100 rounded mb-2 text-sm">
                ⚠️ {w}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Mood Trends (Line Chart) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Mood Trends
            </CardTitle>
          </CardHeader>
          <CardContent style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[5, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Institution-wide Trends (Bar Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Institution-wide Trends</CardTitle>
          </CardHeader>
          <CardContent style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={institutionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="active" fill="#3b82f6" />
                <Bar dataKey="bookings" fill="#10b981" />
                <Bar dataKey="crises" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resource Usage (Pie Chart) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resource Usage
            </CardTitle>
          </CardHeader>
          <CardContent style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resourceUsage}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {resourceUsage.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Counsellor Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Counsellor Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {counsellorReports.map((c, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <span>{c.name}</span>
                  <span className="text-sm">
                    {c.sessions} sessions | ⭐ {c.avgRating}
                  </span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(c.sessions / 50) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Top Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topIssues.map((issue, i) => (
              <div key={i} className="flex justify-between mb-2">
                <span>{issue.issue}</span>
                <span>{issue.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
