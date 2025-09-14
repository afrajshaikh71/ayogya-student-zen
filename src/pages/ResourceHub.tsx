import { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Play, FileText, Headphones, Filter } from "lucide-react";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: "video" | "guide" | "audio";
  duration: string;
  language: string;
  category: string;
  thumbnail: string;
}

const ResourceHub = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const resources: Resource[] = [
    {
      id: 1,
      title: "Breathing Exercises for Anxiety",
      description: "Learn simple breathing techniques to calm your mind during stressful situations",
      type: "video",
      duration: "8 mins",
      language: "Hindi",
      category: "Anxiety Relief",
      thumbnail: "🧘"
    },
    {
      id: 2,
      title: "Study-Life Balance Guide",
      description: "Complete guide to managing academics while maintaining mental wellness",
      type: "guide",
      duration: "15 min read",
      language: "English",
      category: "Academic Wellness",
      thumbnail: "📚"
    },
    {
      id: 3,
      title: "Sleep Meditation for Students",
      description: "Guided meditation to help you fall asleep peacefully after a stressful day",
      type: "audio",
      duration: "20 mins",
      language: "Hindi",
      category: "Sleep & Recovery",
      thumbnail: "🌙"
    },
    {
      id: 4,
      title: "Dealing with Exam Stress",
      description: "Practical strategies to manage pressure during examination periods",
      type: "video",
      duration: "12 mins",
      language: "English",
      category: "Academic Wellness",
      thumbnail: "📝"
    },
    {
      id: 5,
      title: "Building Self-Confidence",
      description: "A comprehensive guide to boost your self-esteem and confidence",
      type: "guide",
      duration: "10 min read",
      language: "Tamil",
      category: "Personal Growth",
      thumbnail: "💪"
    },
    {
      id: 6,
      title: "Morning Affirmations",
      description: "Start your day with positive thoughts and self-empowering statements",
      type: "audio",
      duration: "5 mins",
      language: "English",
      category: "Personal Growth",
      thumbnail: "☀️"
    }
  ];

  const categories = ["All", "Anxiety Relief", "Academic Wellness", "Sleep & Recovery", "Personal Growth"];
  const languages = ["All", "Hindi", "English", "Tamil"];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video": return <Play className="h-4 w-4" />;
      case "guide": return <FileText className="h-4 w-4" />;
      case "audio": return <Headphones className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-primary/20 text-primary";
      case "guide": return "bg-success/20 text-success";
      case "audio": return "bg-accent/20 text-accent";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "All" || resource.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-primary/5">
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
            <h1 className="text-xl font-bold text-white">Resource Hub</h1>
            <p className="text-white/90 text-sm">Helpful guides and materials</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resources..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
          />
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Categories</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center text-2xl">
                    {resource.thumbnail}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg leading-tight">{resource.title}</h3>
                      <Badge className={getTypeColor(resource.type)}>
                        <div className="flex items-center gap-1">
                          {getResourceIcon(resource.type)}
                          <span className="capitalize">{resource.type}</span>
                        </div>
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span>⏱ {resource.duration}</span>
                        <span>🗣 {resource.language}</span>
                      </div>
                      
                      <Button size="sm" className="btn-gradient">
                        {resource.type === "guide" ? "Read" : "Play"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No resources found matching your search.</p>
            <Button onClick={() => { setSearchTerm(""); setSelectedFilter("All"); }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Suggestion Box */}
        <Card className="mt-8 bg-accent/10 border-accent/20">
          <CardContent className="p-4 text-center">
            <h3 className="font-medium mb-2">Need something specific?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Can't find what you're looking for? Suggest new resources to help fellow students.
            </p>
            <Button variant="outline" size="sm">
              Suggest Resource
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourceHub;