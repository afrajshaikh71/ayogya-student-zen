import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";

// Appointment type
type Appointment = {
  id: number;
  student: string;
  date: string; // format: YYYY-MM-DD
  time: string;
  topic: string;
  status: "Upcoming" | "Completed" | "Cancelled";
};

// Calendar generator for current month
const generateCalendar = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: (number | null)[][] = [];
  let day = 1 - firstDay;

  while (day <= daysInMonth) {
    const week: (number | null)[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(day > 0 && day <= daysInMonth ? day : null);
      day++;
    }
    weeks.push(week);
  }
  return weeks;
};

const MySchedule: React.FC = () => {
  const appointments: Appointment[] = [
    { id: 1, student: "Afraz", date: "2025-09-23", time: "10:00 AM", topic: "Exam Stress", status: "Upcoming" },
    { id: 2, student: "Akriti", date: "2025-09-23", time: "12:00 PM", topic: "Sleep Issues", status: "Upcoming" },
    { id: 3, student: "Meena", date: "2025-09-24", time: "03:00 PM", topic: "Career Pressure", status: "Upcoming" },
  ];

  const statusColors: Record<string, string> = {
    Upcoming: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  // Calendar
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0 = January
  const weeks = generateCalendar(year, month);

  // Dates of appointments
  const appointmentDates = appointments.map((a) => a.date);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">📅 My Schedule</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Calendar */}
          <Card className="lg:col-span-1 shadow-md border">
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold mb-4">
                {today.toLocaleString("default", { month: "long" })} {year}
              </h2>
              <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-2 text-center mt-2">
                  {week.map((day, di) => {
                    const dateStr =
                      day !== null
                        ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                        : "";
                    const hasAppt = appointmentDates.includes(dateStr);
                    return (
                      <div
                        key={di}
                        className={`h-10 flex items-center justify-center rounded-md ${
                          day === null
                            ? "bg-transparent"
                            : hasAppt
                            ? "bg-blue-500 text-white font-bold"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right: Appointment List */}
          <div className="lg:col-span-2 relative border-l-2 border-gray-200 pl-6">
            {appointments.map((appt) => (
              <div key={appt.id} className="mb-8 ml-2">
                {/* Timeline Dot */}
                <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full ring-4 ring-white">
                  <Calendar className="w-3 h-3 text-white" />
                </span>

                {/* Card */}
                <Card className="shadow-md border hover:shadow-lg transition">
                  <CardContent className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                        <User className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">{appt.student}</h2>
                        <p className="text-sm text-gray-600">{appt.topic}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4" />
                        <span>{appt.time}</span>
                      </div>
                      <p className="text-sm text-gray-500">{appt.date}</p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appt.status]}`}>
                      {appt.status}
                    </span>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySchedule;
