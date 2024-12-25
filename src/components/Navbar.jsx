import React, { useEffect, useState } from 'react'
import { Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import DarkMode from './DarkMode';


const Navbar = () => {

  const [scrolling, setScrolling] = useState(false);

  // Handle scroll event to toggle background color
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true); // Change background after scrolling 50px
    } else {
      setScrolling(false);
    }
  };

  // Add event listener on mount and cleanup on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
   <nav className={`sticky z-50 top-0  w-full flex flex-row items-center justify-between px-4 py-4 transition-all duration-300 
   ${
        scrolling ? 'bg-transparent scale-90 ' : 'bg-primary-300 scale-100'
      }`}>
    <div className='flex flex-row gap-2  justify-center items-center   '>
      <Store />
      <h1 className='capitalize text-2xl font-primary font-medium text-gray-500'> Nithi textile</h1>
    </div>
  <div className='flex flex-row items-center gap-3'>
    <Menu />
    {/* <DarkMode /> */}
    </div>

   </nav>
  )
}

export default Navbar
