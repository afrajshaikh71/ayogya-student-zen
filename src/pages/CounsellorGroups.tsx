import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, Video, Plus } from "lucide-react";

type Session = {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: number;
  description: string;
};

const GroupSessions: React.FC = () => {
  const [sessions, setSessions] = React.useState<Session[]>([
    {
      id: "1",
      title: "Exam Stress Relief",
      date: "2025-09-25",
      time: "5:00 PM",
      participants: 12,
      description: "A session focused on managing exam-related stress with relaxation techniques.",
    },
    {
      id: "2",
      title: "Sleep & Recovery",
      date: "2025-09-26",
      time: "7:00 PM",
      participants: 8,
      description: "Discuss sleep habits and tips for better recovery during studies.",
    },
    {
      id: "3",
      title: "Confidence Building",
      date: "2025-09-28",
      time: "6:30 PM",
      participants: 15,
      description: "Interactive group activities to improve public speaking and self-confidence.",
    },
  ]);

  const [activeSession, setActiveSession] = React.useState<string>("1");

  const currentSession = sessions.find((s) => s.id === activeSession);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">📅 Sessions</h2>
          <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
            <Plus className="w-4 h-4" /> New
          </button>
        </div>
        <div className="space-y-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setActiveSession(session.id)}
              className={`px-3 py-2 rounded-lg cursor-pointer transition ${
                activeSession === session.id
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{session.title}</span>
                <span className="text-xs text-gray-500">{session.time}</span>
              </div>
              <div className="text-xs text-gray-500">{session.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-4">👥 Group Sessions</h1>

        {currentSession && (
          <Card className="shadow-md border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{currentSession.title}</h2>
                  <p className="text-gray-600 text-sm">{currentSession.description}</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition">
                  <Video className="w-4 h-4" /> Join Session
                </button>
              </div>

              <div className="flex gap-6 text-sm text-gray-600 mt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{currentSession.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{currentSession.participants} participants</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GroupSessions;
