import React, { useEffect, useState } from "react";
import Card from "./card";
import TaskStatsCard from "./taskStatsCard";
import { getAllTasks, getAllUsers } from "@/api/api";
import { format } from "date-fns";

const MainPage = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const tasksRes = await getAllTasks();
                const usersRes = await getAllUsers();

                // ✅ Ensure arrays (sometimes API wraps in an object)
                setTasks(
                    Array.isArray(tasksRes.data)
                        ? tasksRes.data
                        : tasksRes.data.tasks || []
                );
                setUsers(
                    Array.isArray(usersRes.data)
                        ? usersRes.data
                        : usersRes.data.users || []
                );
            } catch (err) {
                console.error("Error fetching data:", err);
                setTasks([]);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* Summary Cards */}
            <Card data={tasks} user={users} loading={loading} />
            <TaskStatsCard allTasks={tasks} loading={loading} />

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Activity
                </h3>

                {loading ? (
                    <p className="text-gray-500">Loading recent activity...</p>
                ) : tasks.length === 0 ? (
                    <p className="text-gray-500">No tasks found.</p>
                ) : (
                    <ul className="space-y-3 text-gray-700">
                        {tasks
                            .filter((t) => t.createdAt) // ✅ avoid crash if createdAt missing
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .slice(0, 5)
                            .map((task) => {
                                const user = users.find((u) => u._id === task.assignedTo);
                                return (
                                    <li key={task._id} className="border-b pb-2">
                                        {task.status === "done" ? "✅" : "⏳"}{" "}
                                        {user ? user.name : "Unknown"}{" "}
                                        {task.status === "done" ? "completed" : "is working on"}{" "}
                                        <span className="font-medium">"{task.title}"</span>{" "}
                                        {task.deadline && (
                                            <span className="text-sm text-gray-500">
                                                (Deadline:{" "}
                                                {format(new Date(task.deadline), "MMM dd, yyyy")})
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                )}
            </div>

            {/* Placeholder for Analytics */}
            <div className="bg-white p-6 rounded-lg shadow mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Analytics (Coming Soon 🚀)
                </h3>
                <p className="text-gray-600">
                    Here you can integrate charts (Recharts/Chart.js) to show task
                    progress, user activity, and system stats.
                </p>
            </div>
        </>
    );
};

export default MainPage;
