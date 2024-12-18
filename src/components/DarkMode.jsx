import React, { useState, useEffect } from 'react';
import { Moon,Sun } from 'lucide-react';

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if the user has a preference for dark mode stored in localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle dark mode and save preference to localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode);
  };

  return (
  
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full transition-all duration-200 "
      >
        {isDarkMode ? <Moon className='bg-gray-900 text-white ' /> : <Sun />}
      </button>
   
  );
};

export default DarkMode;


// className={`${isDarkMode ? '' : ' text-black'} transition-all duration-300`}