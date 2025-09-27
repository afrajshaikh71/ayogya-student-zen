 import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling/staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure",
  "Trouble concentrating on things",
  "Moving/speaking slowly or being restless",
  "Thoughts that you would be better off dead, or hurting yourself",
];

const gad7Questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being restless or unable to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

const ScreeningTools: React.FC = () => {
  const navigate = useNavigate();

  const [phq9Answers, setPhq9Answers] = useState<number[]>(Array(9).fill(-1));
  const [gad7Answers, setGad7Answers] = useState<number[]>(Array(7).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const totalPhq9 = phq9Answers.reduce((a, b) => a + (b >= 0 ? b : 0), 0);
  const totalGad7 = gad7Answers.reduce((a, b) => a + (b >= 0 ? b : 0), 0);

  const getSeverity = (score: number, type: "phq9" | "gad7") => {
    if (type === "phq9") {
      if (score <= 4) return "Minimal Depression";
      if (score <= 9) return "Mild Depression";
      if (score <= 14) return "Moderate Depression";
      if (score <= 19) return "Moderately Severe Depression";
      return "Severe Depression";
    } else {
      if (score <= 4) return "Minimal Anxiety";
      if (score <= 9) return "Mild Anxiety";
      if (score <= 14) return "Moderate Anxiety";
      return "Severe Anxiety";
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setPhq9Answers(Array(9).fill(-1));
    setGad7Answers(Array(7).fill(-1));
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background page-transition">
      {/* Header */}
      <div className="gradient-primary px-4 py-6 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 p-2"
          onClick={() => navigate("/student-home")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-white">Psychological Screening</h1>
          <p className="text-white/90 text-sm">PHQ-9 & GAD-7 Assessments</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* PHQ-9 Section */}
        <Card>
          <CardHeader>
            <CardTitle>PHQ-9 (Depression)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {phq9Questions.map((q, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <p className="font-medium mb-2">{q}</p>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => (
                    <Button
                      key={opt.label}
                      size="sm"
                      variant={phq9Answers[i] === opt.value ? "default" : "outline"}
                      onClick={() => {
                        const updated = [...phq9Answers];
                        updated[i] = opt.value;
                        setPhq9Answers(updated);
                      }}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* GAD-7 Section */}
        <Card>
          <CardHeader>
            <CardTitle>GAD-7 (Anxiety)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {gad7Questions.map((q, i) => (
              <div key={i} className="p-3 border rounded-lg">
                <p className="font-medium mb-2">{q}</p>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => (
                    <Button
                      key={opt.label}
                      size="sm"
                      variant={gad7Answers[i] === opt.value ? "default" : "outline"}
                      onClick={() => {
                        const updated = [...gad7Answers];
                        updated[i] = opt.value;
                        setGad7Answers(updated);
                      }}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit + Results */}
        {!submitted ? (
          <div className="flex gap-3">
            <Button className="flex-1" onClick={handleSubmit}>
              Submit Assessment
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleReset}>
              Reset
            </Button>
          </div>
        ) : (
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-bold mb-2">Results</h3>
              <p className="mb-1">PHQ-9 Score: <b>{totalPhq9}</b> ({getSeverity(totalPhq9, "phq9")})</p>
              <p className="mb-3">GAD-7 Score: <b>{totalGad7}</b> ({getSeverity(totalGad7, "gad7")})</p>
              <Button variant="outline" onClick={handleReset}>
                Retake Assessment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ScreeningTools;
