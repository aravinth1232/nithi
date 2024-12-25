import {
  CircleChevronLeft,
  FileCode,
  House,
  Menu,
  PackageSearch,
  Users,
  UserPlus,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [openSubMenus, setOpenSubMenus] = useState({}); // Tracks open state for each submenu

  const toggleSubMenu = (menu) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu], // Toggle the specific menu
    }));
  };

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionID = localStorage.getItem("id");
    const userName = localStorage.getItem("name");

    if (!sessionID || !userName) {
      navigate("/login");
    } else {
      setUser({ sessionID, userName });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("name");

    navigate("/login");
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <House />,
      path: "/admin/dashboard",
    },
    {
      label: "Invoice",
      icon: <FileCode />,
      subLinks: [
        { label: "Heading1", path: "/invoice/heading1" },
        { label: "Heading2", path: "/invoice/heading2" },
      ],
    },
    {
      label: "Products",
      icon: <PackageSearch />,
      subLinks: [
        { label: "Heading1", path: "/products/heading1" },
        { label: "Heading2", path: "/products/heading2" },
      ],
    },
    {
      label: "Customers",
      icon: <Users />,
      subLinks: [
        { label: "Pending Employees", path: "/customers/pending_employees" },
        { label: "Customer2", path: "/customers/customer2" },
      ],
    },
    {
      label: "System Users",
      icon: <UserPlus />,
      subLinks: [
        { label: "Users1", path: "/system-users/users1" },
        { label: "Users2", path: "/system-users/users2" },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-primary-100 font-primary">
      <div
        className={`bg-gradient3 flex flex-col gap-6 transition-all duration-300 px-2 py-4 ${
          isSidebarOpen ? "w-64" : "w-16 items-center"
        }`}
      >
        {/* Header */}
        <div className="flex flex-row justify-between items-center">
          {isSidebarOpen && <h1 className="text-lg font-semibold">Invoice System</h1>}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="hover:text-gray-600"
          >
            <Menu />
          </button>
        </div>

        {/* Navigation */}
        <aside className="mt-4 flex flex-col gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col">
              {/* Main Menu Item */}
              <Link 
              to={item.path || "" }
                className=" flex flex-row justify-between items-center cursor-pointer"
                onClick={() => toggleSubMenu(item.label)}
              >
                <div className=" flex flex-row items-center gap-3">
                  {/* Icon always visible */}
                  <div className="flex justify-center">{item.icon}</div>
                  {/* Label only visible when sidebar is open */}
                  {isSidebarOpen && <h1 className="text-lg font-semibold">{item.label}</h1>}
                </div>
                {item.subLinks && isSidebarOpen && (
                  <button
                    className={`transform ${
                      openSubMenus[item.label] ? "rotate-90" : ""
                    }`}
                  >
                    <CircleChevronLeft />
                  </button>
                )}
              </Link>

              {/* Submenu */}
              {item.subLinks && (
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    openSubMenus[item.label] && isSidebarOpen ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="px-4 pt-4 flex flex-col gap-2">
                    {item.subLinks.map((subLink, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subLink.path}
                        className="hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer"
                      >
                        <h1 className="text-sm">{subLink.label}</h1>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </aside>
      </div>

      <div className="relative px-2 py-4 flex flex-1 flex-col gap-4">
        {/* Header */}
        <header className="flex flex-row justify-between items-center text-2xl">
          <div>
            <h1>Welcome</h1>
          </div>

          <Link to="/profile" className="flex flex-row gap-2 justify-between items-center">
            <CircleUserRound className="text-5xl" />
            {isSidebarOpen && <h1 className="text-xl">{user ? user.userName : "N/A"}</h1>}
          </Link>
        </header>

        {/* Main */}
        <main className="flex-1 ">
        
          <Outlet />
        </main>

        <button
          className="flex flex-row-reverse gap-2 absolute bottom-3 right-3 bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-xl"
          onClick={handleLogout}
        >
          <LogOut />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
