import React, { useEffect, useState } from "react";
import { getTask, updateTask } from "@/api/api";
import { toast } from "react-toastify";

const MyTasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await getTask();
            setTasks(res.data.tasks || []);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            toast.error("Failed to load tasks");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleStatusUpdate = async (taskId, newStatus) => {
        try {
            const res = await updateTask(taskId, { status: newStatus });
            console.log("Updated task response:", res.data);

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, status: newStatus } : task
                )
            );

            toast.success("Task status updated!");
        } catch (err) {
            console.error("Error updating task:", err);
            toast.error("Failed to update task");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-700 text-lg">Loading your tasks...</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">My Tasks</h1>

            {tasks.length === 0 ? (
                <p className="text-gray-500">You have no tasks assigned yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                        >
                            <h2 className="font-semibold text-lg">{task.title}</h2>
                            <p className="text-gray-600 mt-1">{task.description}</p>
                            <p className="mt-2 text-sm text-gray-500">
                                Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : "—"}
                            </p>
                            <p
                                className={`mt-1 font-medium ${task.status === "done"
                                    ? "text-green-600"
                                    : task.status === "inProgress"
                                        ? "text-blue-600"
                                        : "text-orange-600"
                                    }`}
                            >
                                Status: {task.status}
                            </p>


                            {task.status !== "done" && (
                                <div className="mt-3 flex gap-2">
                                    <button
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => handleStatusUpdate(task._id, "inProgress")}
                                    >
                                        Start Task
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        onClick={() => handleStatusUpdate(task._id, "done")}
                                    >
                                        Mark Completed
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTasksPage;
