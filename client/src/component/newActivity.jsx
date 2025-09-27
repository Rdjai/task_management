import React from "react";

const NewActivityTasks = ({ tasks }) => {
    const latestTasks = tasks.slice(-5).reverse();
    return (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-semibold mb-4">New Tasks</h3>
            <ul className="space-y-2">
                {latestTasks.length > 0 ? (
                    latestTasks.map((task) => (
                        <li key={task._id} className="border p-2 rounded hover:bg-gray-100">
                            <span className="font-medium">{task.title}</span> - {task.assignedTo?.name || "N/A"}
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No new tasks</li>
                )}
            </ul>
        </div>
    );
};

export default NewActivityTasks;
