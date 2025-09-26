import React from "react";

const Card = () => {
    // Static data simulating API response
    const stats = [
        { title: "Total Users", value: 12, color: "bg-red-500" },
        { title: "Total Tasks", value: 34, color: "bg-green-500" },
        { title: "Completed Tasks", value: 20, color: "bg-blue-500" },
        { title: "Pending Tasks", value: 14, color: "bg-yellow-500" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg ${stat.color} text-white`}
                >
                    <h3 className="text-lg font-medium mb-2">{stat.title}</h3>
                    <p className="text-3xl font-bold">{stat.value}</p>
                </div>
            ))}
        </div>
    );
};

export default Card;
