import { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Clock, Star, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CounsellorSlot {
  id: number;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  time: string;
  available: boolean;
  languages: string[];
}

const CounsellorBooking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const counsellors: CounsellorSlot[] = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Student Anxiety & Depression",
      rating: 4.8,
      experience: "8 years",
      time: "10:00 AM - 11:00 AM",
      available: true,
      languages: ["Hindi", "English"]
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialization: "Academic Stress Management",
      rating: 4.9,
      experience: "12 years",
      time: "2:00 PM - 3:00 PM",
      available: true,
      languages: ["Hindi", "English", "Punjabi"]
    },
    {
      id: 3,
      name: "Dr. Ananya Patel",
      specialization: "Relationship & Family Issues",
      rating: 4.7,
      experience: "6 years",
      time: "4:00 PM - 5:00 PM",
      available: false,
      languages: ["Gujarati", "English", "Hindi"]
    },
    {
      id: 4,
      name: "Dr. Ravi Nair",
      specialization: "Career Counselling & Self-esteem",
      rating: 4.6,
      experience: "10 years",
      time: "6:00 PM - 7:00 PM",
      available: true,
      languages: ["Malayalam", "English", "Hindi"]
    },
    {
      id: 5,
      name: "Pandit Mohan Sharma",
      specialization: "Spiritual Guidance & Stress Relief",
      rating: 4.9,
      experience: "15 years",
      time: "7:00 AM - 8:00 AM",
      available: true,
      languages: ["Sanskrit", "Hindi", "English"]
    },
    {
      id: 6,
      name: "Sister Mary Thomas",
      specialization: "Moral Guidance & Inner Peace",
      rating: 4.8,
      experience: "12 years",
      time: "5:00 PM - 6:00 PM", 
      available: true,
      languages: ["English", "Tamil", "Hindi"]
    }
  ];

  const handleBookAppointment = (counsellor: CounsellorSlot) => {
    toast({
      title: "Appointment Booked!",
      description: `Your session with ${counsellor.name} has been scheduled for ${selectedDate?.toLocaleDateString()} at ${counsellor.time}`,
    });
    navigate("/student-home");
  };

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-success/5">
      {/* Header */}
      <div className="gradient-primary px-4 py-6">
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
            <h1 className="text-xl font-bold text-white">Book Counsellor</h1>
            <p className="text-white/90 text-sm">Professional support when you need it</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border w-full"
              disabled={(date) => date < new Date()}
            />
          </CardContent>
        </Card>

        {/* Available Counsellors */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Available on {selectedDate?.toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
          
          <div className="space-y-4">
            {counsellors.map((counsellor) => (
              <Card 
                key={counsellor.id} 
                className={`card-hover ${!counsellor.available ? 'opacity-50' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{counsellor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {counsellor.specialization}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          <span>{counsellor.rating}</span>
                        </div>
                        <span>{counsellor.experience} experience</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-medium">{counsellor.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                        <MapPin className="h-3 w-3" />
                        <span>Languages: {counsellor.languages.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleBookAppointment(counsellor)}
                    disabled={!counsellor.available}
                    className={`w-full ${counsellor.available ? 'btn-gradient' : ''}`}
                    variant={counsellor.available ? 'default' : 'secondary'}
                  >
                    {counsellor.available ? 'Book Now' : 'Not Available'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Note */}
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Need immediate support? Call our 24/7 helpline at{" "}
              <span className="font-semibold text-accent">9152987821</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CounsellorBooking;