import { User2 } from 'lucide-react';
import { path } from 'motion/react-client';
import { LogIn } from 'lucide-react';
import { UserPlus, House } from 'lucide-react';


import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown menu
  const toggleMenu = () => setIsOpen(!isOpen);

    const {pathname} = useLocation();
    const currentPath = pathname;

  const links =[
    {id:1, name: "Home", path:"/",icon: House},
    {id:2, name: "Login", path:"/login",icon: LogIn},
    {id:3, name: "Signup", path:"/signup",icon: UserPlus},
  ]

  return (
    <div className="relative z-50">
     <button
        
      onClick={toggleMenu}
     className="flex flex-col justify-between items-start w-8 h-6 group">
      <span className={`block w-8 h-[4px]  bg-gray-500 group-hover:w-5  transition-all        
        `}></span>
      <span className="block w-5 h-[3px] bg-gray-500 group-hover:w-8 transition-all "></span>
      <span className={`block w-8 h-[4px]  bg-gray-500 group-hover:w-5  transition-all        
        `}></span>
    </button>
      
      {isOpen && (
        <div className="absolute z-50 right-0 w-48 transition-all duration-300 bg-primary-200 backdrop-blur-xl rounded-md shadow-lg flex flex-col gap-3 px-4 py-4">
          {
            links.map(({id,name,path,icon:Icon}) =>(
            <Link 
            key={id}
            onClick={toggleMenu}
            className={`flex flex-row items-center gap-3 text-xl font-primary
                ${path ===currentPath ? "font-medium text-primary-900" : " text-gray-500 hover:text-black " }
                `}
            to= {path}
            >
            <Icon />
            <h1>{name}</h1>
            </Link>


            ))
          }


        </div>
      )}
    </div>
  );
};

export default Menu;
