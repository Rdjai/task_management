import React, { useEffect, useState } from "react";
import { getMyTasks } from "@/api/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PuffLoader } from "react-spinners";

const TasksList = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const res = await getMyTasks();
                console.log("Tasks API Response:", res.data);

                const taskArray = Array.isArray(res.data)
                    ? res.data
                    : res.data?.data || [];

                setTasks(taskArray);
                setFilteredTasks(taskArray);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        const filtered = tasks.filter((task) =>
            task.title?.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredTasks(filtered);
    }, [search, tasks]);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">All Tasks</h2>

            <input
                type="text"
                placeholder="Search by task title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <PuffLoader color="#F59E0B" size={50} />
                </div>
            ) : (
                <ScrollArea className="max-h-[500px] overflow-auto transition-all duration-500 ease-in-out">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">Title</th>
                                <th className="p-2 border">Description</th>
                                <th className="p-2 border">Assigned To</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Deadline</th>
                                <th className="p-2 border">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map((task) => (
                                    <tr
                                        key={task._id}
                                        className="hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        <td className="p-2 border">{task.title}</td>
                                        <td className="p-2 border">{task.description}</td>
                                        <td className="p-2 border">
                                            {task.assignedTo ? task.assignedTo.name : "N/A"}
                                        </td>
                                        <td className="p-2 border capitalize">{task.status}</td>
                                        <td className="p-2 border">
                                            {task.deadline ? new Date(task.deadline).toLocaleDateString() : "—"}
                                        </td>
                                        <td className="p-2 border">
                                            {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "—"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="p-2 border text-center" colSpan={6}>
                                        No tasks found
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </ScrollArea>
            )}
        </div>
    );
};

export default TasksList;
