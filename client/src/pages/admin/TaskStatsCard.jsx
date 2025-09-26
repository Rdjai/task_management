import React from "react";

const TaskStatsCard = () => {
    const completedTasks = [
        { title: "Create Task API", employee: "Alice", details: "Backend task completed" },
        { title: "Design HomePage", employee: "Bob", details: "UI finished" },
    ];

    const pendingTasks = [
        { title: "Setup Redis Cache", employee: "Charlie", details: "Waiting for backend" },
        { title: "Integrate JWT Auth", employee: "David", details: "Pending review" },
    ];

    return (
        <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow mt-6 text-gray-800">

            {/* Completed Tasks */}
            <div className="flex-1 p-4 md:border-r border-gray-300">
                <h3 className="text-xl font-semibold mb-4 text-green-600">✅ Completed Tasks</h3>
                <ul className="space-y-3">
                    {completedTasks.map((task, index) => (
                        <li
                            key={index}
                            className="bg-green-100 p-3 rounded-lg shadow-sm hover:bg-green-200 cursor-pointer transition"
                        >
                            <p className="font-semibold">{task.title}</p>
                            <p className="text-sm text-gray-700">Employee: {task.employee}</p>
                            <p className="text-sm text-gray-600">{task.details}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Pending Tasks */}
            <div className="flex-1 p-4">
                <h3 className="text-xl font-semibold mb-4 text-yellow-600">⏳ Pending Tasks</h3>
                <ul className="space-y-3">
                    {pendingTasks.map((task, index) => (
                        <li
                            key={index}
                            className="bg-yellow-100 p-3 rounded-lg shadow-sm hover:bg-yellow-200 cursor-pointer transition"
                        >
                            <p className="font-semibold">{task.title}</p>
                            <p className="text-sm text-gray-700">Employee: {task.employee}</p>
                            <p className="text-sm text-gray-600">{task.details}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskStatsCard;
