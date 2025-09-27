import React from "react";

const Activity = ({ tasks }) => {
    const activities = tasks
        .slice(-5)
        .reverse()
        .map((task) => ({
            id: task._id,
            text: `${task.assignedTo?.name || "Someone"} ${task.status === "done" ? "completed" : "updated"} "${task.title}"`,
        }));

    return (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <ul className="space-y-2 text-gray-700">
                {activities.length > 0 ? (
                    activities.map((act) => <li key={act.id}>✅ {act.text}</li>)
                ) : (
                    <li>No recent activity</li>
                )}
            </ul>
        </div>
    );
};

export default Activity;
