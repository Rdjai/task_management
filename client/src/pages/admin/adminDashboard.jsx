import React from "react";
import AdminSidebar from "./sidebar";
import Card from "./card";

const AdminDashboard = () => {
  // Sample static data

  const users = [
    { name: "Jagannath Kashyap", email: "jagan@example.com", role: "admin", createdAt: "2025-09-26" },
    { name: "Alice", email: "alice@example.com", role: "user", createdAt: "2025-09-25" },
  ];

  const tasks = [
    { title: "Create Task API", description: "Build backend APIs", status: "pending", assignedTo: "Alice", createdBy: "Jagannath", deadline: "2025-09-30" },
    { title: "Design HomePage", description: "Update UI for homepage", status: "done", assignedTo: "Alice", createdBy: "Jagannath", deadline: "2025-09-28" },
  ];

  return (

    <div className="flex bg-slate-200" style={{ height: 'calc(100vh - 5rem)' }}>
      <AdminSidebar className="w-1/4 h-full" />
      <div className="bg-green-600 flex-1 p-4 text-white rounded-2xl m-4 overflow-auto">
        <Card />
      </div>
    </div>




  );
};

export default AdminDashboard;
