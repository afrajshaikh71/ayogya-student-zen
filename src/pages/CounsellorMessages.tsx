import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Send, User } from "lucide-react";

type Message = {
  id: number;
  sender: "student" | "counsellor";
  text: string;
  time: string;
};

type Student = {
  id: string;
  name: string;
  messages: Message[];
};

const StudentMessages: React.FC = () => {
  const [students, setStudents] = React.useState<Student[]>([
    {
      id: "afraz",
      name: "Afraz",
      messages: [
        { id: 1, sender: "student", text: "Hello sir, I’m feeling stressed about exams.", time: "10:00 AM" },
        { id: 2, sender: "counsellor", text: "Hi Afraz, don’t worry. Let’s talk about your routine.", time: "10:02 AM" },
      ],
    },
    {
      id: "akriti",
      name: "Akriti",
      messages: [
        { id: 1, sender: "student", text: "Good morning sir, I feel anxious before presentations.", time: "09:30 AM" },
        { id: 2, sender: "counsellor", text: "Hi Akriti, let’s practice some confidence techniques.", time: "09:35 AM" },
      ],
    },
    {
      id: "ananya",
      name: "Ananya",
      messages: [
        { id: 1, sender: "student", text: "Sir, I often feel low energy during classes.", time: "11:15 AM" },
        { id: 2, sender: "counsellor", text: "Hi Ananya, let’s look at your sleep schedule and habits.", time: "11:20 AM" },
      ],
    },
    {
      id: "praanvi",
      name: "Praanvi",
      messages: [
        { id: 1, sender: "student", text: "I get nervous when speaking in groups.", time: "12:00 PM" },
        { id: 2, sender: "counsellor", text: "Hi Praanvi, I’ll guide you with small group exercises first.", time: "12:05 PM" },
      ],
    },
    {
      id: "meena",
      name: "Meena",
      messages: [
        { id: 1, sender: "student", text: "Sir, I feel pressure balancing studies and personal life.", time: "01:00 PM" },
        { id: 2, sender: "counsellor", text: "Hi Meena, let’s work on time management strategies together.", time: "01:05 PM" },
      ],
    },
  ]);

  const [activeStudent, setActiveStudent] = React.useState<string>("afraz");
  const [newMessage, setNewMessage] = React.useState("");

  const currentStudent = students.find((s) => s.id === activeStudent);

  const handleSend = () => {
    if (!newMessage.trim() || !currentStudent) return;

    const newMsg: Message = {
      id: currentStudent.messages.length + 1,
      sender: "counsellor",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setStudents((prev) =>
      prev.map((s) =>
        s.id === activeStudent ? { ...s, messages: [...s.messages, newMsg] } : s
      )
    );
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Students</h2>
        <div className="space-y-2">
          {students.map((student) => (
            <div
              key={student.id}
              onClick={() => setActiveStudent(student.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                activeStudent === student.id
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <User className="w-5 h-5" />
              <span>{student.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-4">💬 Student Messages</h1>

        <Card className="flex-1 flex flex-col shadow-md border">
          <CardContent className="flex-1 overflow-y-auto p-5 space-y-4">
            {currentStudent?.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "counsellor" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl shadow-sm max-w-xs ${
                    msg.sender === "counsellor"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-xs opacity-70 mt-1 text-right">{msg.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Input Box */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${currentStudent?.name}...`}
            className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentMessages;
