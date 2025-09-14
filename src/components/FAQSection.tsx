import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is AI Chat Support?",
      answer: "Talk to our caring AI assistant to share your feelings and get instant coping tips."
    },
    {
      question: "How does the Counsellor Booking work?",
      answer: "Schedule one-to-one sessions with professional counsellors or trusted mentors."
    },
    {
      question: "What is Peer Support?",
      answer: "Connect anonymously with fellow students, share experiences, and support each other."
    },
    {
      question: "What will I find in the Resource Hub?",
      answer: "Access guides, videos, and articles in English + regional languages on stress, exams, and wellness."
    },
    {
      question: "What is the Mood Tracker?",
      answer: "Log your daily emotions and identify patterns or triggers over time."
    },
    {
      question: "What are Wellness Challenges?",
      answer: "Fun daily activities (like breathing exercises, journaling) that help build healthy habits."
    },
    {
      question: "How do AI-driven Wellness Recommendations work?",
      answer: "Based on your mood/stress logs, Ayogya suggests meditation, short breaks, or relaxation tips."
    },
    {
      question: "What are Wellness Streaks & Rewards?",
      answer: "Stay motivated with streaks (like 7-day wellness) and unlock badges for consistency."
    }
  ];

  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-semibold mb-4 text-foreground">How Ayogya Helps You</h2>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border rounded-lg px-4 bg-card shadow-soft"
          >
            <AccordionTrigger className="hover:no-underline">
              <span className="font-semibold text-left">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;