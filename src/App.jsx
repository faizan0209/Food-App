import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routes from "./components/Routes";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
function App() {

  // Define the router for routing
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Routes />, // Pass the function to Routes
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />, // Apply blur effect here
          errorElement: <ErrorPage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup/>,
        },
        {
          path: "/admin",
          element: <Admin/>,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
