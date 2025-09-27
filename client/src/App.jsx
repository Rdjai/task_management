import './App.css'
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import HomePage from './pages/HomePage'
import AdminDashboard from './pages/admin/adminDashboard'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import { ToastContainer } from "react-toastify";
import NotFoundPage from './pages/NotFoundPage'
import UserDashboard from './pages/user/UserDashboard'

function App() {
  // Store role in state
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  // Keep role in sync with localStorage (optional)
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole !== role) {
      setRole(storedRole);
    }
  }, [role]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/dashboard",
          element: role === "admin" ? <AdminDashboard /> : <UserDashboard />,
        },
        {
          path: "/login",
          element: <LoginPage setRole={setRole} />, // pass setRole to update on login
        },
        {
          path: "/signup",
          element: <RegisterPage setRole={setRole} />,
        },
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
