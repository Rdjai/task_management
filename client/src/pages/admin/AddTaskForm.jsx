import React, { useEffect, useState } from "react";
import { createTask, getAllUsers } from "@/api/api";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTaskForm = ({ setShowAddTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!assignedTo) {
            toast.error("Please assign the task to an employee.");
            return;
        }
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const res = await createTask({ title, description, deadline, assignedTo });
            console.log("Task Created:", res.data);
            toast.success(`Task assigned to ${user.find(u => u._id === assignedTo)?.name} successfully!`);
            // setShowAddTask(false);
        } catch (err) {
            console.error("Error creating task:", err);
            toast.error(err.response?.data?.message || "Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers().then((res) => setUser(res.data));
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded"
                    rows={3}
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <Select onValueChange={(value) => setAssignedTo(value)}>
                    <SelectTrigger className="w-full border p-2 rounded">
                        <SelectValue placeholder="Employee" />
                    </SelectTrigger>
                    <SelectContent>
                        {user.map((u) => (
                            <SelectItem key={u._id} value={u._id}>
                                {u.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Task"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowAddTask(false)}
                        className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTaskForm;
