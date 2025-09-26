import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import HomePage from './pages/HomePage'
import AdminDashboard from './pages/admin/adminDashboard'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/admin",
          element: <AdminDashboard />,
        },

      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
