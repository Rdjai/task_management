import React, { useEffect, useState } from "react";
import { getProfile, } from "@/api/api";
import UserSidebar from "./userSidebar";

const UserDashboard = () => {
    const [selectedPage, setSelectedPage] = useState("dashboard");
    return (
        <div className="flex bg-slate-200" style={{ height: "calc(100vh - 5rem)" }}>
            <UserSidebar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
        </div>
    );
};

export default UserDashboard;
