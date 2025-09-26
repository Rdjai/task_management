import React from 'react'
import { House, Users, ListTodo } from 'lucide-react'

function AdminSidebar() {
    const SideBaLink = [
        {
            title: "Home",
            icon: <House />
        },
        {
            title: "users",
            icon: <Users />
        },
        {
            title: "Add Task",
            icon: <ListTodo />
        }
    ]
    return (
        <div className="bg-white  w-1/6 p-4 text-white rounded-2xl m-4   ">
            <h2 className="text-white">
                Admin Dashboard
            </h2>
            <ul className="mt-4 space-y-2">
                {SideBaLink.map((link, index) => (
                    <li key={index} className="hover:bg-red-700  hover:text-white p-2 rounded cursor-pointer flex gap-4 text-black font-mono font-bold    ">
                        {link.icon}
                        {link.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminSidebar