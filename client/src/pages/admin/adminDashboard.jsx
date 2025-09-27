import React, { useState } from "react";
import AdminSidebar from "./sidebar";
import AddTaskForm from "./addTaskForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainPage from "./main";
import UsersList from "./UsersList";
import TasksList from "./TasksList";
import UserSettingPage from "./adminSettign";
import UserProfilePage from "./AdminProfile";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const token = localStorage.getItem("token");
  if (selectedPage === "logout") {
    localStorage.clear();
    Navigate("/login");
  }

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex bg-slate-200" style={{ height: "calc(100vh - 5rem)" }}>
      <AdminSidebar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />

      <ScrollArea className="flex-1 p-4 rounded-2xl m-4">
        {selectedPage === "dashboard" && <MainPage />}
        {selectedPage === "users" && <UsersList />}
        {selectedPage === "add-task" && <AddTaskForm />}
        {selectedPage === "tasks" && <TasksList />}
        {selectedPage === "settings" && <UserSettingPage />}
        {selectedPage === "profile" && <UserProfilePage />}
      </ScrollArea>
    </div>
  );
};

export default AdminDashboard;
