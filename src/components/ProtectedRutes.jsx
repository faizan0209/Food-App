import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "./Firebase";
import { auth } from "./Firebase"; // Your Firebase setup file
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once the auth state is determined
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional loader while checking auth
  }

  // Redirect to login if no user is authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected content if authenticated
  return children;
};

export default ProtectedRoute;
