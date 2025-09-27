import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { SiTask } from "react-icons/si";
import {
    House,
    ListTodo,
    FolderKanban,
    Settings,
    UserCog,
    LogOut,
} from 'lucide-react'
const UserSideBarLinks = [
    {
        title: "Dashboard",
        key: "dashboard",
        icon: <House />,
        path: "/user/dashboard",
        api: "/api/v1/user/dashboard",
    },
    {
        title: "My Tasks",
        key: "tasks",
        icon: <FolderKanban />,
        path: "/user/tasks",
        api: "/api/v1/tasks",
    },
    {
        title: "Tasks List",
        key: "taskList",
        icon: <ListTodo />,
        path: "/user/tasks",
        api: "/api/v1/tasks",
    },
    {
        title: "Profile",
        key: "profile",
        icon: <UserCog />,
        path: "/user/profile",
        api: "/api/v1/profile",
    },
    {
        title: "Settings",
        key: "settings",
        icon: <Settings />,
        path: "/user/settings",
        api: "/api/v1/settings",
    },
    {
        title: "Logout",
        key: "logout",
        icon: <LogOut />,
        path: "/logout",
        api: "—",
    },
];

function UserSidebar({ selectedPage, setSelectedPage }) {


    return (

        <div className="bg-white w-1/6 p-4 rounded-2xl m-4 shadow overflow-hidden flex flex-col h-[calc(100vh-7rem)]">
            <h2 className="text-black font-bold text-lg font-mono flex gap-2">
                <SiTask className="w-[25px] h-[25px] text-red-600" /> user Dashboard
            </h2>

            <ScrollArea className="flex-1 overflow-auto mt-4">
                <ul className="space-y-2 p-4">
                    {UserSideBarLinks.map((link, index) => (
                        <li
                            key={link.key}
                            onClick={() => setSelectedPage(link.key)}
                            className={`p-2 rounded cursor-pointer font-bold ${selectedPage === link.key ? "bg-red-700 text-white" : "text-black"
                                }`}
                        >
                            {link.title}
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </div >

    )
}

export default UserSidebar
