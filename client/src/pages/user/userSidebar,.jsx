import React, { useEffect, useState } from "react";
import { getProfile, getAllTasks } from "@/api/api"; // your API calls
import { format } from "date-fns";

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch profile + tasks
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const profileRes = await getProfile();
                const tasksRes = await getAllTasks();
                setUser(profileRes.data);
                setTasks(tasksRes.data);
            } catch (err) {
                console.error("Error fetching user dashboard:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading dashboard...</p>;

    if (!user) return <p className="text-center text-red-500">Failed to load user data.</p>;

    // Filter tasks for this user
    const userTasks = tasks.filter((task) => task.assignedTo === user._id);

    // Stats
    const total = userTasks.length;
    const completed = userTasks.filter((t) => t.status === "done").length;
    const inProgress = userTasks.filter((t) => t.status === "in-progress").length;
    const pending = total - (completed + inProgress);

    return (
        <div className="p-6 space-y-6">
            {/* User Profile */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">👤 {user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                    {user.role || "Employee"}
                </span>
            </div>

            {/* Task Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-100 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold">Total</h3>
                    <p className="text-2xl font-bold text-green-700">{total}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold">Completed</h3>
                    <p className="text-2xl font-bold text-blue-700">{completed}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold">In Progress</h3>
                    <p className="text-2xl font-bold text-yellow-700">{inProgress}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-semibold">Pending</h3>
                    <p className="text-2xl font-bold text-red-700">{pending}</p>
                </div>
            </div>

            {/* Task List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">📌 Your Tasks</h3>
                {userTasks.length === 0 ? (
                    <p className="text-gray-500">No tasks assigned to you.</p>
                ) : (
                    <ul className="space-y-3">
                        {userTasks.map((task) => (
                            <li key={task._id} className="border-b pb-2">
                                <span className="font-medium">{task.title}</span> —{" "}
                                <span
                                    className={`text-sm px-2 py-1 rounded ${task.status === "done"
                                            ? "bg-green-200 text-green-700"
                                            : task.status === "in-progress"
                                                ? "bg-yellow-200 text-yellow-700"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {task.status}
                                </span>
                                {task.deadline && (
                                    <span className="ml-2 text-sm text-gray-500">
                                        Deadline: {format(new Date(task.deadline), "MMM dd, yyyy")}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
