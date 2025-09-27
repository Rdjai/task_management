import React, { useEffect, useState } from "react";
import { getTask } from "@/api/api";
import Card from "@/pages/component/card";
import NewTasks from "../component/newActivity";
import Activity from "../component/Activity";
const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({
        completed: 0,
        pending: 0,
        inProgress: 0,
        total: 0,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const res = await getTask();
                const { tasks, stats } = res.data;

                setTasks(tasks);

                const totalTasks = tasks.length;

                setStats({
                    completed: stats.completed || 0,
                    pending: stats.pending || 0,
                    inProgress: stats.inProgress || 0,
                    total: totalTasks,
                });
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
            setLoading(false);
        };

        fetchTasks();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-700 text-lg">Loading tasks...</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <Card title="Completed" count={stats.completed} />
                <Card title="Pending" count={stats.pending} />
                <Card title="In Progress" count={stats.inProgress} />
                <Card title="Total Tasks" count={stats.total} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Recent Tasks</h3>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Title</th>
                            <th className="p-2 border">Assigned To</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks
                                .slice(-10)
                                .reverse()
                                .map((task) => (
                                    <tr key={task._id} className="hover:bg-gray-100">
                                        <td className="p-2 border">{task.title}</td>
                                        <td className="p-2 border">{task.assignedTo?.name || "N/A"}</td>
                                        <td className="p-2 border capitalize">{task.status}</td>
                                        <td className="p-2 border">{new Date(task.deadline).toLocaleDateString()}</td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td className="p-2 border text-center" colSpan={4}>
                                    No tasks found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <NewTasks tasks={tasks} />
            <Activity tasks={tasks} />
        </div>

    );
};

export default AdminDashboard;