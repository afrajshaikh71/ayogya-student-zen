import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Send, Phone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import chatbotAvatar from "@/assets/chatbot-avatar.jpg";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatbotScreen = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Maya, your mental wellness companion. I'm here to listen and support you. How are you feeling today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);

  const crisisKeywords = ["suicide", "kill myself", "end it all", "hurt myself", "self harm", "die", "no point living"];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    // Check for crisis keywords
    const hasCrisisKeyword = crisisKeywords.some(keyword => 
      inputMessage.toLowerCase().includes(keyword)
    );

    if (hasCrisisKeyword) {
      setShowCrisisAlert(true);
    }

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: hasCrisisKeyword 
          ? "I'm really concerned about what you're going through. Your feelings are valid, and I want to help. Please consider reaching out to a professional counsellor or crisis helpline immediately. You don't have to face this alone."
          : getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage("");
  };

  const getBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes("anxious") || lowerText.includes("worry")) {
      return "I understand you're feeling anxious. Try taking slow, deep breaths with me. Breathe in for 4 counts, hold for 4, breathe out for 4. Remember, anxiety is temporary and you're stronger than it feels right now.";
    }
    if (lowerText.includes("sad") || lowerText.includes("depressed")) {
      return "I hear that you're feeling sad. It's okay to feel this way - your emotions are valid. Sometimes talking about what's bothering you can help. Would you like to share what's making you feel this way?";
    }
    if (lowerText.includes("stress") || lowerText.includes("overwhelm")) {
      return "Stress can feel overwhelming, but you're taking a positive step by reaching out. Try breaking down your tasks into smaller, manageable pieces. What's the most urgent thing you need to handle today?";
    }
    if (lowerText.includes("exam") || lowerText.includes("study")) {
      return "Academic pressure is common among students. Remember that your worth isn't determined by grades. Consider creating a study schedule, taking regular breaks, and practicing self-compassion.";
    }
    
    return "Thank you for sharing that with me. Your feelings are important and valid. I'm here to support you through this. Can you tell me more about how I can help you today?";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-primary px-4 py-4 flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/20 p-2"
          onClick={() => navigate("/student-home")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <img 
          src={chatbotAvatar} 
          alt="Maya AI" 
          className="w-10 h-10 rounded-full border-2 border-white/20"
        />
        <div>
          <h1 className="text-lg font-semibold text-white">Maya AI</h1>
          <p className="text-sm text-white/80">Always here to listen</p>
        </div>
      </div>

      {/* Crisis Alert */}
      {showCrisisAlert && (
        <Alert className="m-4 border-destructive bg-destructive/10">
          <Phone className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-medium text-destructive">Immediate Support Available</p>
              <div className="space-y-1 text-sm">
                <p>• iCall: 9152987821</p>
                <p>• Vandrevala Foundation: 9999666555</p>
                <p>• Emergency: 112</p>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="destructive" onClick={() => navigate("/booking")}>
                  Notify Counsellor
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowCrisisAlert(false)}>
                  Close
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Messages */}
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <Card className={`max-w-[80%] ${
              message.sender === "user" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card border shadow-soft"
            }`}>
              <CardContent className="p-3">
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your feelings..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage}
            className="btn-gradient"
            disabled={!inputMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotScreen;