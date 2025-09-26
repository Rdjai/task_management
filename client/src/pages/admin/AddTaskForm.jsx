import React, { useState } from "react";
import { createTask } from "@/api/api";

const AddTaskForm = ({ setShowAddTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createTask({ title, description, deadline });
            console.log("Task Created:", res.data);
            setShowAddTask(false); // hide form after submit
        } catch (err) {
            console.error("Error creating task:", err);
        }
    };

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
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                    >
                        Create Task
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowAddTask(false)}
                        className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTaskForm;
