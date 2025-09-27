import React, { useState } from "react";
import UserSidebar from "./userSidebar.jsx";
import MainPage from "./main.jsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import MyTasksPage from "./MyTasksPage.jsx";
import UserProfilePage from "./userProfilePage.jsx";
import UserSettingPage from "./UserSettingPage.jsx";
import { Navigate } from "react-router-dom";
import TasksList from "./TasksList.jsx";

const UserDashboard = () => {

    const [selectedPage, setSelectedPage] = useState("dashboard");
    if (selectedPage === "logout") {
        localStorage.clear();
        Navigate("/login");
    }
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />;
    }
    console.log("user data in dashboard:", selectedPage);
    return (
        <div className="flex bg-slate-200" style={{ height: "calc(100vh - 5rem)" }}>
            <UserSidebar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />

            <ScrollArea className="flex-1 p-4 rounded-2xl m-4">
                {selectedPage === "dashboard" && <MainPage />}
                {selectedPage === "tasks" && <MyTasksPage />}
                {selectedPage === "settings" && <UserSettingPage />}
                {selectedPage === "profile" && <UserProfilePage />}
                {selectedPage === "taskList" && <TasksList />}
            </ScrollArea>

        </div>
    );
};

export default UserDashboard;
