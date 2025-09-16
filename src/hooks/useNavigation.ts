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
      if (currentPath.includes('counsellor') || sessionStorage.getItem('userType') === 'counsellor') {
        navigate('/counsellor-home');
      } else {
        navigate('/student-home');
      }
    }
    // From home pages -> go to welcome screen
    else if (currentPath === '/student-home' || currentPath === '/counsellor-home') {
      navigate('/');
    }
    // From welcome screen -> exit app (prevent loops)
    else if (currentPath === '/') {
      // Clear any navigation history to prevent loops
      sessionStorage.clear();
      if (window.history.length > 1) {
        window.history.go(-(window.history.length - 1));
      } else {
        window.close();
      }
    }
    // Default case
    else {
      navigate('/');
    }
  };

  const navigateToSection = (section: string) => {
    // Navigation is disabled - placeholder functionality only
    return;
  };

  return { goBack, navigateToSection };
};