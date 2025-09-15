import { useNavigate, useLocation } from "react-router-dom";

export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    const currentPath = location.pathname;
    
    // From any section -> go to appropriate home
    if (currentPath.includes('/chatbot') || 
        currentPath.includes('/resources') || 
        currentPath.includes('/booking') || 
        currentPath.includes('/forum') || 
        currentPath.includes('/mood') || 
        currentPath.includes('/challenges')) {
      // Check if coming from counsellor context
      const referrer = document.referrer;
      if (referrer.includes('counsellor') || currentPath.includes('counsellor')) {
        navigate('/counsellor-home');
      } else {
        navigate('/student-home');
      }
    }
    // From home pages -> go to welcome screen
    else if (currentPath === '/student-home' || currentPath === '/counsellor-home') {
      navigate('/');
    }
    // From welcome screen -> exit app (go back in browser history)
    else if (currentPath === '/') {
      window.history.back();
    }
    // Default case
    else {
      navigate('/');
    }
  };

  const navigateToSection = (section: string) => {
    // For demo purposes, these sections scroll to parts of the page
    // In a real app, these might be separate routes
    switch (section.toLowerCase()) {
      case 'home':
        navigate('/student-home');
        break;
      case 'about':
        // Scroll to about section on home page
        navigate('/student-home');
        setTimeout(() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        break;
      case 'features':
        // Scroll to wellness hub section
        navigate('/student-home');
        setTimeout(() => {
          const featuresSection = document.getElementById('wellness-hub');
          if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        break;
      case 'blog':
        navigate('/resources');
        break;
      case 'pricing':
        // For demo, show pricing info in resources
        navigate('/resources');
        break;
      case 'contact':
        navigate('/booking');
        break;
      case 'faq':
        // Scroll to FAQ section on home page
        navigate('/student-home');
        setTimeout(() => {
          const faqSection = document.getElementById('faq');
          if (faqSection) {
            faqSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        break;
      default:
        navigate('/student-home');
    }
  };

  return { goBack, navigateToSection };
};