import { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Flame, Star, Check, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: "mindfulness" | "physical" | "social" | "learning";
  points: number;
  duration: string;
  completed: boolean;
  streak?: number;
}

interface UserStats {
  totalPoints: number;
  currentStreak: number;
  challengesCompleted: number;
  level: number;
}

const WellnessChallenges = () => {
  const navigate = useNavigate();
  
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 280,
    currentStreak: 5,
    challengesCompleted: 14,
    level: 3
  });

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "5-Minute Morning Meditation",
      description: "Start your day with a peaceful 5-minute meditation session",
      category: "mindfulness",
      points: 20,
      duration: "5 mins",
      completed: false
    },
    {
      id: 2,
      title: "Gratitude Journal Entry",
      description: "Write down 3 things you're grateful for today",
      category: "mindfulness",
      points: 15,
      duration: "3 mins",
      completed: true
    },
    {
      id: 3,
      title: "Take 1000 Steps",
      description: "Go for a short walk and get your body moving",
      category: "physical",
      points: 25,
      duration: "10 mins",
      completed: false
    },
    {
      id: 4,
      title: "Compliment Someone",
      description: "Make someone's day brighter with a genuine compliment",
      category: "social",
      points: 30,
      duration: "1 min",
      completed: false
    },
    {
      id: 5,
      title: "Learn Something New",
      description: "Spend 10 minutes learning about a topic that interests you",
      category: "learning",
      points: 25,
      duration: "10 mins",
      completed: false
    },
    {
      id: 6,
      title: "Deep Breathing Exercise",
      description: "Practice 4-7-8 breathing technique for stress relief",
      category: "mindfulness",
      points: 15,
      duration: "5 mins",
      completed: true
    }
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mindfulness": return "🧘";
      case "physical": return "🏃";
      case "social": return "👥";
      case "learning": return "📚";
      default: return "✨";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "mindfulness": return "bg-accent/20 text-accent";
      case "physical": return "bg-success/20 text-success";
      case "social": return "bg-primary/20 text-primary";
      case "learning": return "bg-mood-happy/20 text-mood-happy";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleCompleteChallenge = (challengeId: number) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge || challenge.completed) return;

    setChallenges(prev => 
      prev.map(c => 
        c.id === challengeId ? { ...c, completed: true } : c
      )
    );

    setUserStats(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + challenge.points,
      challengesCompleted: prev.challengesCompleted + 1,
      currentStreak: prev.currentStreak + 1
    }));

    // Add confetti animation
    const button = document.querySelector(`[data-challenge-id="${challengeId}"]`);
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => {
        button.classList.remove('animate-pulse');
      }, 1500);
    }

    toast({
      title: "Challenge Completed! 🎉",
      description: `You earned ${challenge.points} points! Keep up the great work!`,
    });
  };

  const completedToday = challenges.filter(c => c.completed).length;
  const totalToday = challenges.length;
  const progressPercentage = (completedToday / totalToday) * 100;

  const levelProgress = (userStats.totalPoints % 100);
  const pointsToNextLevel = 100 - levelProgress;

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-success/5">
      {/* Header */}
      <div className="gradient-wellness px-4 py-6">
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
            <h1 className="text-xl font-bold text-white">Wellness Challenges</h1>
            <p className="text-white/90 text-sm">Daily activities for mental wellness</p>
          </div>
        </div>

        {/* User Stats */}
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center text-white">
              <div>
                <div className="text-2xl font-bold">{userStats.totalPoints}</div>
                <div className="text-xs text-white/80">Total Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold flex items-center justify-center gap-1">
                  <Flame className="h-5 w-5 text-orange-400" />
                  {userStats.currentStreak}
                </div>
                <div className="text-xs text-white/80">Day Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold flex items-center justify-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400" />
                  {userStats.level}
                </div>
                <div className="text-xs text-white/80">Level</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/80 mb-1">
                <span>Level {userStats.level} Progress</span>
                <span>{pointsToNextLevel} points to next level</span>
              </div>
              <Progress value={levelProgress} className="bg-white/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Daily Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Today's Progress
              </span>
              <span className="text-lg font-bold text-primary">
                {completedToday}/{totalToday}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {completedToday === totalToday 
                ? "🎉 All challenges completed! You're amazing!" 
                : `${totalToday - completedToday} more challenges to complete today`
              }
            </p>
          </CardContent>
        </Card>

        {/* Today's Challenges */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Today's Challenges</h2>
          <div className="space-y-3">
            {challenges.map((challenge) => (
              <Card 
                key={challenge.id} 
                className={`card-hover ${challenge.completed ? 'bg-success/10 border-success/20' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getCategoryIcon(challenge.category)}</span>
                        <Badge className={getCategoryColor(challenge.category)}>
                          {challenge.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {challenge.duration}
                        </div>
                      </div>
                      
                      <h3 className={`font-semibold ${challenge.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {challenge.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {challenge.description}
                      </p>
                    </div>
                    
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold text-primary">
                        +{challenge.points}
                      </div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleCompleteChallenge(challenge.id)}
                    disabled={challenge.completed}
                    className={`w-full ${challenge.completed ? '' : 'btn-gradient'}`}
                    variant={challenge.completed ? 'outline' : 'default'}
                    data-challenge-id={challenge.id}
                  >
                    {challenge.completed ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Completed
                      </>
                    ) : (
                      'Complete Challenge'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievement Badges */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">🏆 Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-xs font-medium">5-Day Streak</div>
              </div>
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="text-2xl mb-1">🧘</div>
                <div className="text-xs font-medium">Mindful Week</div>
              </div>
              <div className="p-3 bg-white/30 rounded-lg opacity-50">
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-xs font-medium">Perfect Week</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4 text-center">
            <h3 className="font-medium mb-2">💡 Wellness Tip</h3>
            <p className="text-sm text-muted-foreground">
              Consistency beats intensity! Even small daily actions can lead to big improvements in your mental health over time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WellnessChallenges;