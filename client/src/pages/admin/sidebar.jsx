import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    House,
    Users,
    ListTodo,
    FolderKanban,
    BarChart,
    Settings,
    Bell,
    FileText,
    UserCog,
    LogOut,
    Database,
} from 'lucide-react'
const SideBaLink = [
    {
        title: "Dashboard",
        key: "dashboard",
        icon: <House />,
        path: "/admin",
        api: "/api/v1",
        onClick: () => setShowAddTask(false)
    },
    {
        title: "Users",
        key: "users",
        icon: <Users />,
        path: "/admin/users",
        api: "/api/v1/users"
    },
    {
        title: "Add Task",
        key: "add-task",
        icon: <ListTodo />,
        path: "/admin/add-task",
        api: "/api/v1/tasks/add",
        onClick: () => setShowAddTask(true)
    },
    {
        title: "All Tasks",
        key: "tasks",
        icon: <FolderKanban />,
        path: "/admin/tasks",
        api: "/api/v1/tasks"
    },
    // {
    //     title: "Reports",
    //     key: "reports",
    //     icon: <BarChart />,
    //     path: "/admin/reports",
    //     api: "/api/v1/reports"
    // },
    // {
    //     title: "Notifications",
    //     key: "Notifications",
    //     icon: <Bell />,
    //     path: "/admin/notifications",
    //     api: "/api/v1/notifications"
    // },
    // {
    //     title: "Documents",
    //     key: "documents",
    //     icon: <FileText />,
    //     path: "/admin/documents",
    //     api: "/api/v1/documents"
    // },
    {
        title: "Profile",
        key: "profile",
        icon: <UserCog />,
        path: "/admin/profile",
        api: "/api/v1/profile"
    },
    {
        title: "Settings",
        key: "settings",
        icon: <Settings />,
        path: "/admin/settings",
        api: "/api/v1/settings"
    },
    // {
    //     title: "Database",
    //     key: "database",
    //     icon: <Database />,
    //     path: "/admin/db",
    //     api: "/api/v1/db"
    // },
    {
        title: "Logout",
        key: "logout",
        icon: <LogOut />,
        path: "/logout",
        api: "—"
    },
]
function AdminSidebar({ selectedPage, setSelectedPage }) {


    return (

        <div className="bg-white w-1/6 p-4 rounded-2xl m-4 shadow overflow-hidden flex flex-col h-[calc(100vh-7rem)]">
            <h2 className="text-black font-bold text-lg font-mono">
                Admin Dashboard
            </h2>

            <ScrollArea className="flex-1 overflow-auto mt-4">
                <ul className="space-y-2 p-4">
                    {SideBaLink.map((link, index) => (
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

export default AdminSidebar
