import React, { useEffect, useState } from "react";
import { BiRestaurant } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; 

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);  

  useEffect(() => {
    const auth = getAuth(); 
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); 
    });

    return () => unsubscribe(); 
  }, []);

  const handleLoginClick = () => {
    navigate("/login"); 
  };

  const handleLogoutClick = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);  
      navigate("/"); 
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="fixed w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center p-5 md:px-32 px-5">
        <div className="flex items-center cursor-pointer">
          <BiRestaurant size={32} className="text-brightColor" />
          <h1 className="ml-2 text-xl font-semibold">FoodieWeb</h1>
        </div>

        <nav className="hidden md:flex items-center text-lg font-medium gap-8">
          <button
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={() => navigate("/about")}
          >
            About
          </button>
          <button
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>
        </nav>

        <div>
          {user ? (
            <button
              onClick={handleLogoutClick}
              className="hidden md:inline-block px-4 py-2 bg-brightColor text-white font-medium rounded-md shadow-md hover:bg-opacity-90 transition-all"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className="hidden md:inline-block px-4 py-2 bg-brightColor text-white font-medium rounded-md shadow-md hover:bg-opacity-90 transition-all"
            >
              Login
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button className="focus:outline-none">
            <span className="text-2xl">☰</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
