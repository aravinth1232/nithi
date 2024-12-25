import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [employee,setEmployee] = useState({});

  useEffect(() => {
    // Check if session ID exists in localStorage
    const sessionID = localStorage.getItem("sessionID");
    const userName = localStorage.getItem("userName");
    const employee = localStorage.getItem("employee");
   

    if (!sessionID || !userName) {
      // If no session, redirect to login page
      navigate("/login");
    } else {
      // Set user info if session exists
      setUser({ sessionID, userName });
      setEmployee(employee);

      console.log("employee", employee);
  
    }
  }, [navigate]);
  console.log("employee", employee);
  const handleLogout = () => {
    // Clear session data from localStorage
    localStorage.removeItem("sessionID");
    localStorage.removeItem("userName");
  
    // Redirect to login page after logout
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.userName}!</h1>
          <p>Your session ID: {user.sessionID}</p>
          <button 
          onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
