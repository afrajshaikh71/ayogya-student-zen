import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, MessageCircle } from "lucide-react";
import ayogyaLogo from "@/assets/ayogya-logo.jpg";
import wellnessHero from "@/assets/wellness-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageCircle,
      title: "AI Mental Health Support",
      description: "24/7 caring AI companion with crisis detection and immediate support"
    },
    {
      icon: Users,
      title: "Peer Community",
      description: "Safe, anonymous forum to connect with fellow students facing similar challenges"
    },
    {
      icon: Heart,
      title: "Mood Tracking",
      description: "Track your emotional patterns and understand your mental wellness journey"
    },
    {
      icon: Shield,
      title: "Professional Care",
      description: "Connect with licensed counsellors who understand Indian student life"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative gradient-primary px-6 py-12 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={wellnessHero} 
            alt="Wellness" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <img 
            src={ayogyaLogo} 
            alt="Ayogya Logo" 
            className="w-20 h-20 mx-auto mb-4 rounded-2xl shadow-large"
          />
          <h1 className="text-3xl font-bold text-white mb-3">
            Welcome to Ayogya
          </h1>
          <p className="text-lg text-white/90 mb-2 max-w-sm mx-auto">
            Your trusted mental wellness companion designed for Indian students
          </p>
          <p className="text-sm text-white/80 mb-8 max-w-xs mx-auto">
            Safe • Confidential • Culturally Aware • Always Available
          </p>
          
          <Button
            onClick={() => navigate("/student-home")}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-medium px-8 py-6 rounded-xl text-lg font-medium"
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Supporting Your Mental Wellness Journey
        </h2>
        
        <div className="space-y-6">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover border-0 shadow-soft">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-primary">1000+</div>
            <div className="text-sm text-muted-foreground">Students Helped</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-success">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-accent">95%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 gradient-primary text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-3">
              Ready to Start Your Wellness Journey?
            </h3>
            <p className="text-white/90 mb-6">
              Join thousands of students who've found support, guidance, and community through Ayogya.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/student-home")}
                size="lg"
                className="w-full bg-white text-primary hover:bg-white/90 shadow-medium"
              >
                Enter as Student
              </Button>
              <Button
                onClick={() => navigate("/admin")}
                variant="ghost"
                size="lg" 
                className="w-full text-white hover:bg-white/20 border border-white/30"
              >
                Counsellor Login
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Support */}
        <Card className="mt-8 bg-destructive/10 border-destructive/20">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-destructive mb-2">
              Need Immediate Help?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you're having thoughts of self-harm or are in crisis, please reach out immediately.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center py-2 px-4 bg-background rounded">
                <span>iCall Helpline</span>
                <span className="font-semibold">9152987821</span>
              </div>
              <div className="flex justify-between items-center py-2 px-4 bg-background rounded">
                <span>Vandrevala Foundation</span>
                <span className="font-semibold">9999666555</span>
              </div>
              <div className="flex justify-between items-center py-2 px-4 bg-background rounded">
                <span>Emergency Services</span>
                <span className="font-semibold">112</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;