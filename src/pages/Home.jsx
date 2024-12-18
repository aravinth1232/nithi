import React, { useEffect, useState } from 'react';
import homeimage from "../assets/homebg.webp";
import { Link } from 'react-router-dom';


const Home = () => {
 

  return (
   <>
  
    <main className= ' h-screen flex flex-row items-center gap-5   px-4  font-primary'>
      <div className='  flex flex-col gap-8'>
        <div className='flex flex-col gap-3'>
        <h1 className='text-5xl font-medium text-primary-800'>Welcome to Nithi Textile</h1>
        <p
        className='text-3xl text-primary-700'
        >Discover Fabrics That Define Style</p>
        </div>
      

        <Link to="/login">
        <button className="relative inline-block px-6 py-3 font-bold text-white bg-primary-500
            hover:text-white active:scale-90 transition-all duration-500 overflow-hidden group">
  <span className="relative z-10">Discover More</span>
  
  {/* Skewed Background */}
  <span className="absolute inset-0 w-full h-full bg-primary-700 transform -translate-x-[95%] group-hover:translate-x-0 
                   transition-transform duration-300 ease-out origin-left skew-x-[45deg] group-hover:skew-x-0"></span>
</button>

        </Link>

      </div>

      <div className=' flex-1 overflow-hidden'>
        <img
        className='w-full hover:scale-110 transition-all duration-300'
        src={homeimage} alt="" />
      </div>


    </main>
   
   </>
  );
};

export default Home;
