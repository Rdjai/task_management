import React, { useState } from "react";
import AdminSidebar from "./sidebar";
import AddTaskForm from "./addTaskForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainPage from "./main";
import UsersList from "./UsersList";

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  return (
    <div className="flex bg-slate-200" style={{ height: "calc(100vh - 5rem)" }}>
      <AdminSidebar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />

      <ScrollArea className="flex-1 p-4 rounded-2xl m-4">
        {selectedPage === "dashboard" && <MainPage />}
        {selectedPage === "users" && <UsersList />}
        {selectedPage === "add-task" && <AddTaskForm />}
        {/* Add other pages similarly */}
      </ScrollArea>
    </div>
  );
};

export default AdminDashboard;
