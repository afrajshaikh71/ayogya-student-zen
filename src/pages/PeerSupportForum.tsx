import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Plus, MessageCircle, Heart, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  category: string;
  likes: number;
  replies: number;
  isLiked: boolean;
}

const PeerSupportForum = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: 1,
      title: "Dealing with exam stress - tips that worked for me",
      content: "Hey everyone! I wanted to share some techniques that really helped me manage my anxiety during board exams...",
      author: "StudyBuddy23",
      timestamp: "2 hours ago",
      category: "Academic Stress",
      likes: 12,
      replies: 8,
      isLiked: false
    },
    {
      id: 2,
      title: "Feeling overwhelmed by career choices",
      content: "I'm in my final year and everyone keeps asking what I want to do next. I honestly have no idea and it's making me panic...",
      author: "ConfusedSenior",
      timestamp: "4 hours ago",
      category: "Career Anxiety",
      likes: 18,
      replies: 15,
      isLiked: true
    },
    {
      id: 3,
      title: "How to deal with toxic friends?",
      content: "Some of my friends have been really negative lately and it's affecting my mental health. Has anyone dealt with this?",
      author: "SeekerOfPeace",
      timestamp: "1 day ago",
      category: "Relationships",
      likes: 25,
      replies: 22,
      isLiked: false
    },
    {
      id: 4,
      title: "Meditation helped me with anxiety - sharing my journey",
      content: "I started meditating 3 months ago and it's been life-changing. Here's how I got started and what I learned...",
      author: "MindfulStudent",
      timestamp: "2 days ago",
      category: "Self Care",
      likes: 35,
      replies: 12,
      isLiked: false
    }
  ]);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categories = ["Academic Stress", "Career Anxiety", "Relationships", "Self Care", "General"];

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: posts.length + 1,
      title: newPostTitle,
      content: newPostContent,
      author: "You",
      timestamp: "Just now",
      category: selectedCategory,
      likes: 0,
      replies: 0,
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setSelectedCategory("General");
    setIsDialogOpen(false);
    toast({
      title: "Post Created!",
      description: "Your post has been shared with the community.",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic Stress": return "bg-primary/20 text-primary";
      case "Career Anxiety": return "bg-accent/20 text-accent";
      case "Relationships": return "bg-success/20 text-success";
      case "Self Care": return "bg-mood-happy/20 text-mood-happy";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20 p-2"
              onClick={() => navigate("/student-home")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">Peer Support Forum</h1>
              <p className="text-white/90 text-sm">Connect with fellow students</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="mx-4">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="What's on your mind?"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share your thoughts, experiences, or ask for support..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCreatePost}
                    className="btn-gradient flex-1"
                    disabled={!newPostTitle.trim() || !newPostContent.trim()}
                  >
                    Post
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Posts */}
      <div className="px-4 py-6 space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="card-hover">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <Badge className={getCategoryColor(post.category)}>
                  {post.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{post.timestamp}</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {post.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`p-2 ${post.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                  >
                    <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="ml-1 text-xs">{post.likes}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="p-2 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span className="ml-1 text-xs">{post.replies}</span>
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground">by {post.author}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Guidelines */}
      <Card className="mx-4 mb-6 bg-accent/10 border-accent/20">
        <CardContent className="p-4 text-center">
          <h3 className="font-medium mb-2">Community Guidelines</h3>
          <p className="text-sm text-muted-foreground">
            Be respectful, supportive, and maintain anonymity. 
            Report any harmful content immediately.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PeerSupportForum;