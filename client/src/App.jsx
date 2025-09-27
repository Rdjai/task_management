import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import HomePage from './pages/HomePage'
import AdminDashboard from './pages/admin/adminDashboard'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'
import { ToastContainer } from "react-toastify";
import NotFoundPage from './pages/NotFoundPage'


function App() {


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
          element: <AdminDashboard />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <RegisterPage />,
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
