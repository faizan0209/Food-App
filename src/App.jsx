import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routes from "./components/Routes";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import OrderFood from "./components/OrderFood";
import ProtectedRutes from './components/ProtectedRutes'

function App() {
  // Define the router for routing
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Routes />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
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
          element: <Signup />,
        },
        {
          path: "/admin",
          element: (
            <ProtectedRutes>
              <Admin/>
            </ProtectedRutes>
          ),
        },
        {
          path: "/order",
          element: (
            <ProtectedRutes>
              <OrderFood /> {/* Wrap OrderFood in ProtectedRoute */}
            </ProtectedRutes>
          ),
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
