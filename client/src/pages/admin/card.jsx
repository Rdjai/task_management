import React from "react";

const Card = ({ data, user, loading }) => {
    // Calculate stats only if data is available
    const dataLength = data ? data.length : 0;
    const userLength = user ? user.length : 0;
    const completeTask = data ? data.filter((task) => task.status === "done").length : 0;
    const pendingTask = data ? data.filter((task) => task.status !== "done").length : 0;

    const stats = [
        { title: "Total Users", value: userLength, color: "bg-red-500" },
        { title: "Total Tasks", value: dataLength, color: "bg-green-500" },
        { title: "Completed Tasks", value: completeTask, color: "bg-blue-500" },
        { title: "Pending Tasks", value: pendingTask, color: "bg-yellow-500" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {loading
                ? stats.map((_, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-gray-200 animate-pulse h-32"
                    >
                        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                        <div className="w-1/2 h-10 bg-gray-300 rounded"></div>
                    </div>
                ))
                : stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg ${stat.color} text-white transform transition hover:scale-105 duration-300`}
                    >
                        <h3 className="text-lg font-medium mb-2">{stat.title}</h3>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                ))}
        </div>
    );
};

export default Card;
