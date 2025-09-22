import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Moon, Smile, BookOpen, Users } from "lucide-react";

type Metric = {
  id: string;
  title: string;
  value: number;
  icon: any;
  color: string;
  trend: number[]; // last 7 days
};

const Sparkline: React.FC<{ data: number[]; width?: number; height?: number; color?: string }> = ({
  data,
  width = 140,
  height = 28,
  color = "#10B981",
}) => {
  if (!data || data.length === 0) return null;

  const n = data.length;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = n > 1 ? width / (n - 1) : width;

  const points = data.map((d, i) => {
    const x = i * step;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`; // <-- backticks used here
  });

  const dAttr = `M${points.join(" L ")}`; // <-- and here

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path
        d={dAttr}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CounsellorProgress: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = React.useState<string>("cohort");

  const baseMetrics: Metric[] = [
    { id: "stress", title: "Stress Level", value: 65, icon: Brain, color: "bg-red-500", trend: [60, 62, 64, 66, 65, 67, 65] },
    { id: "sleep", title: "Sleep Quality", value: 80, icon: Moon, color: "bg-blue-500", trend: [78, 77, 79, 80, 82, 81, 80] },
    { id: "mood", title: "Overall Mood", value: 70, icon: Smile, color: "bg-green-500", trend: [68, 69, 70, 71, 70, 72, 70] },
    { id: "academic", title: "Academic Engagement", value: 75, icon: BookOpen, color: "bg-purple-500", trend: [73, 74, 75, 76, 75, 77, 75] },
    { id: "social", title: "Social Interaction", value: 60, icon: Users, color: "bg-pink-500", trend: [58, 59, 60, 61, 60, 62, 60] },
  ];

  const studentOverrides: Record<string, Partial<Record<string, number>>> = {
    alice: { stress: 50, sleep: 85, mood: 78, academic: 82, social: 70 },
    bob: { stress: 72, sleep: 68, mood: 60, academic: 66, social: 55 },
  };

  const metrics = baseMetrics.map((m) => {
    const override = selectedStudent !== "cohort" ? studentOverrides[selectedStudent]?.[m.id] : undefined;
    return { ...m, value: override ?? m.value };
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
  <div>
    <h1 className="text-2xl font-bold">Student Progress</h1>
    
    {selectedStudent !== "cohort" && (
      <p className="text-gray-600 text-sm mt-1">
        Progress Report for {selectedStudent === "afraz" ? "Afraz" : "Akriti"}
      </p>
    )}
  </div>

  <div className="flex items-center gap-3">
    <label className="text-sm text-gray-600">Viewing:</label>
    <select
      value={selectedStudent}
      onChange={(e) => setSelectedStudent(e.target.value)}
      className="px-3 py-2 border rounded-md bg-white"
    >
      <option value="cohort">Cohort Overview</option>
      <option value="afraz">Student: Afraz</option>
      <option value="bob">Student: Akriti</option>
    </select>
  </div>
</div>

        <div className="grid gap-6 md:grid-cols-2">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const sparkColor =
              metric.color === "bg-red-500"
                ? "#ef4444"
                : metric.color === "bg-blue-500"
                ? "#3b82f6"
                : metric.color === "bg-green-500"
                ? "#10b981"
                : metric.color === "bg-purple-500"
                ? "#8b5cf6"
                : "#ec4899";

            return (
              <Card key={metric.id} className="shadow-sm border-0">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full ${metric.color} flex items-center justify-center`}>
                        <Icon className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{metric.title}</div>
                        <div className="text-xs text-gray-500">Last 7 days</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold">{metric.value}%</div>
                      <div className="text-xs text-gray-500">
                        {metric.value >= 75 ? "Good" : metric.value >= 50 ? "Average" : "Attention"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                        <div className={`${metric.color} h-3 rounded-full`} style={{ width: `${metric.value}%` }} />
                      </div>

                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>0%</span>
                        <span>{metric.value}%</span>
                      </div>
                    </div>

                    <div className="w-36 h-8">
                      <Sparkline data={metric.trend} width={140} height={28} color={sparkColor} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CounsellorProgress;

