import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../../config';

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordvisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
  
    const formData = {
      name,
      password,
    };
  
    // console.log(formData); // Log form data for debugging purposes
  
    try {
      const response = await fetch(`${url}/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Send cookies along with request
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
  
      if (result.status === "success") {
        alert(result.message);
        


        // Store session data in localStorage after successful login
        localStorage.setItem("id", result.data.id); // User ID
      localStorage.setItem("name", result.data.name); // Username
      localStorage.setItem("role", result.data.role); // User role

        // Redirect to another page (like dashboard) after successful login
        navigate("/admin/dashboard");
      } else {
        alert(result.message); // Show error message if login fails
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='min-h-screen  max-w-md mx-auto flex flex-col justify-start pt-10 items-center gap-6 font-primary'>
      <h1 className='text-xl font-semibold'>Login</h1>

      <form onSubmit={handleLogin} className='w-full flex flex-col gap-7 px-4 py-6 bg-transparent backdrop-blur-lg shadow-lg'>
        {/* Email Input */}
        <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
          <label 
           className='font-semibold '
          htmlFor="name">Name</label>
          <input
            className='
            bg-primary-100
            focus:border-2 focus:border-primary-500
            border-2 px-2 py-2 focus:outline-none rounded-xl'
            placeholder='xyz123'
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className='flex flex-col gap-2'>
          <label 
          className='font-semibold '
          htmlFor="password">Password</label>
          <div className='relative w-full'>
            <input
              className=' w-full
              bg-primary-100
              focus:border-2 focus:border-primary-500
              border-2 px-2 py-2 focus:outline-none rounded-xl'
              placeholder='***'
              type={passwordvisible ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              disabled={password.length < 1}
              onClick={() => setPasswordVisible(!passwordvisible)}
              className={`absolute top-1/2 right-2 transform -translate-y-1/2
                ${password.length > 1 ? "opacity-100" : "opacity-0 cursor-not-allowed"}
                transition-opacity`}
            >
              {passwordvisible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        </div>

        {/* Submit Button */}
        <div className='flex flex-col  gap-3 '>
          <div className='self-end '>
        <button className="relative inline-block px-8 py-2 font-bold text-white bg-primary-500 rounded-[40px]
            hover:text-white active:scale-90 transition-all duration-500 overflow-hidden group">
              <span className="relative z-10">Login</span>
              
              {/* Skewed Background */}
              <span className="absolute inset-0 w-full h-full bg-primary-700 transform -translate-x-[95%] group-hover:translate-x-0 
                              transition-transform duration-300 ease-out origin-left skew-x-[45deg] group-hover:skew-x-0"></span>
            </button>
            </div>
          <div className='flex flex-row items-center gap-1 self-center'>
            <h1 className='text-gray-600 text-sm'>Don't have an account?</h1>
            <Link
            className='text-sm font-medium hover:text-gray-600'
            to="/signup">Signup</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
