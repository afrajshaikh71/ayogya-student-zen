import { useNavigate, useLocation } from "react-router-dom";

export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    const currentPath = location.pathname;
    const userType = sessionStorage.getItem('userType');
    
    // From any section -> go to appropriate home based on strict user type
    if (currentPath.includes('/chatbot') || 
        currentPath.includes('/resources') || 
        currentPath.includes('/booking') || 
        currentPath.includes('/forum') || 
        currentPath.includes('/mood') || 
        currentPath.includes('/challenges')) {
      
      // Strict routing: Only go to counsellor-home if explicitly counsellor type
      if (userType === 'counsellor') {
        navigate('/counsellor-home');
      } else {
        // Default to student home for all other cases (including student and undefined)
        navigate('/student-home');
      }
    }
    // From home pages -> go to login page (/)
    else if (currentPath === '/student-home' || currentPath === '/counsellor-home') {
      navigate('/');
    }
    // From login page -> exit app
    else if (currentPath === '/') {
      // Clear session and exit
      sessionStorage.clear();
      if (window.history.length > 1) {
        window.history.go(-(window.history.length - 1));
      } else {
        window.close();
      }
    }
    // Default case - go to login
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