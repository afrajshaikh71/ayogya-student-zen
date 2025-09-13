import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MoodEntry {
  date: string;
  mood: string;
  energy: number;
  stress: number;
  note?: string;
}

const MoodTracking = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [selectedEnergy, setSelectedEnergy] = useState<number>(5);
  const [selectedStress, setSelectedStress] = useState<number>(5);
  const [todayNote, setTodayNote] = useState("");

  // Sample mood data for the past week
  const moodHistory: MoodEntry[] = [
    { date: "2024-09-13", mood: "happy", energy: 8, stress: 3 },
    { date: "2024-09-12", mood: "neutral", energy: 6, stress: 5 },
    { date: "2024-09-11", mood: "anxious", energy: 4, stress: 8 },
    { date: "2024-09-10", mood: "excited", energy: 9, stress: 2 },
    { date: "2024-09-09", mood: "sad", energy: 3, stress: 7 },
    { date: "2024-09-08", mood: "happy", energy: 8, stress: 2 },
    { date: "2024-09-07", mood: "neutral", energy: 7, stress: 4 }
  ];

  const moods = [
    { name: "happy", emoji: "😊", color: "mood-happy", label: "Happy" },
    { name: "excited", emoji: "🤩", color: "mood-excited", label: "Excited" },
    { name: "neutral", emoji: "😐", color: "mood-neutral", label: "Neutral" },
    { name: "sad", emoji: "😢", color: "mood-sad", label: "Sad" },
    { name: "anxious", emoji: "😰", color: "mood-anxious", label: "Anxious" }
  ];

  const handleLogMood = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today to log your mood.",
        variant: "destructive"
      });
      return;
    }

    // Add checkmark animation
    const moodButton = document.querySelector(`[data-mood="${selectedMood}"]`);
    if (moodButton) {
      moodButton.classList.add('animate-bounce');
      setTimeout(() => {
        moodButton.classList.remove('animate-bounce');
      }, 1000);
    }

    toast({
      title: "Mood Logged! ✅",
      description: "Your daily mood has been recorded successfully.",
    });
    
    // Reset form
    setSelectedMood("");
    setSelectedEnergy(5);
    setSelectedStress(5);
    setTodayNote("");
  };

  const getMoodStats = () => {
    const totalEntries = moodHistory.length;
    const happyDays = moodHistory.filter(entry => entry.mood === "happy" || entry.mood === "excited").length;
    const avgEnergy = (moodHistory.reduce((sum, entry) => sum + entry.energy, 0) / totalEntries).toFixed(1);
    const avgStress = (moodHistory.reduce((sum, entry) => sum + entry.stress, 0) / totalEntries).toFixed(1);
    
    return { totalEntries, happyDays, avgEnergy, avgStress };
  };

  const stats = getMoodStats();

  const getMoodColor = (mood: string) => {
    const moodObj = moods.find(m => m.name === mood);
    return moodObj ? moodObj.color : "mood-neutral";
  };

  const getMoodEmoji = (mood: string) => {
    const moodObj = moods.find(m => m.name === mood);
    return moodObj ? moodObj.emoji : "😐";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-mood px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 p-2"
            onClick={() => navigate("/student-home")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">Mood Tracking</h1>
            <p className="text-white/90 text-sm">Track your emotional wellbeing</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Today's Mood Log */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              How are you feeling today?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mood Selection */}
            <div>
              <p className="text-sm font-medium mb-3">Select your mood:</p>
              <div className="grid grid-cols-5 gap-3">
                {moods.map((mood) => (
                  <Button
                    key={mood.name}
                    variant={selectedMood === mood.name ? "default" : "outline"}
                    className={`h-16 flex-col gap-1 ${
                      selectedMood === mood.name ? mood.color + " text-white" : ""
                    }`}
                    onClick={() => setSelectedMood(mood.name)}
                    data-mood={mood.name}
                  >
                    <span className="text-lg">{mood.emoji}</span>
                    <span className="text-xs">{mood.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div>
              <p className="text-sm font-medium mb-3">Energy Level: {selectedEnergy}/10</p>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <Button
                    key={i}
                    variant={i < selectedEnergy ? "default" : "outline"}
                    size="sm"
                    className={`h-8 w-8 p-0 ${
                      i < selectedEnergy ? "bg-success text-white" : ""
                    }`}
                    onClick={() => setSelectedEnergy(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stress Level */}
            <div>
              <p className="text-sm font-medium mb-3">Stress Level: {selectedStress}/10</p>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <Button
                    key={i}
                    variant={i < selectedStress ? "default" : "outline"}
                    size="sm"
                    className={`h-8 w-8 p-0 ${
                      i < selectedStress ? "bg-destructive text-white" : ""
                    }`}
                    onClick={() => setSelectedStress(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </div>

            {/* Optional Note */}
            <div>
              <p className="text-sm font-medium mb-2">Optional Note:</p>
              <textarea
                value={todayNote}
                onChange={(e) => setTodayNote(e.target.value)}
                placeholder="What's affecting your mood today?"
                className="w-full p-3 border rounded-md resize-none"
                rows={3}
              />
            </div>

            <Button onClick={handleLogMood} className="w-full btn-gradient">
              Log Today's Mood
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">{stats.happyDays}</div>
                <div className="text-sm text-muted-foreground">Good Days</div>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.avgEnergy}</div>
                <div className="text-sm text-muted-foreground">Avg Energy</div>
              </div>
            </div>

            {/* Mood History */}
            <div className="space-y-3">
              <p className="font-medium">Recent Mood History:</p>
              {moodHistory.slice(0, 5).map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                    <div>
                      <p className="text-sm font-medium">
                        {new Date(entry.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{entry.mood}</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <div>Energy: {entry.energy}/10</div>
                    <div>Stress: {entry.stress}/10</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mood Insights */}
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">💡 Insight</h3>
            <p className="text-sm text-muted-foreground">
              You've been tracking your mood for {stats.totalEntries} days. 
              Your average stress level is {stats.avgStress}/10. 
              Consider trying our breathing exercises when stress feels high.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodTracking;