import React from "react";

const TaskStatsCard = ({ allTasks, loading }) => {
    const completedTasks = allTasks ? allTasks.filter((task) => task.status === "done") : [];
    const pendingTasks = allTasks ? allTasks.filter((task) => task.status !== "done") : [];
    console.log(allTasks);
    return (
        <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow mt-6 text-gray-800">

            <div className="flex-1 p-4 md:border-r border-gray-300">
                <h3 className="text-xl font-semibold mb-4 text-green-600">✅ Completed Tasks</h3>
                <ul className="space-y-3">
                    {completedTasks.map((task, index) => (
                        <li
                            key={index}
                            className="bg-green-100 p-3 rounded-lg shadow-sm hover:bg-green-200 cursor-pointer transition"
                        >
                            <p className="font-semibold">{task.title}</p>
                            <p className="text-sm text-gray-700">Employee: {task.assignedTo}</p>
                            <p className="text-sm text-gray-600">{task.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 p-4">
                <h3 className="text-xl font-semibold mb-4 text-yellow-600">⏳ Pending Tasks</h3>
                <ul className="space-y-3">
                    {pendingTasks.map((task, index) => (
                        <li
                            key={index}
                            className="bg-yellow-100 p-3 rounded-lg shadow-sm hover:bg-yellow-200 cursor-pointer transition"
                        >
                            <p className="font-semibold">{task.title}</p>
                            <p className="text-sm text-gray-700">Employee: {task.assignedTo}</p>
                            <p className="text-sm text-gray-600">{task.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskStatsCard;
