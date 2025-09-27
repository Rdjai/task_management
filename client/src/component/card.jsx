import React from "react";
import { CheckCircle, Clock, Play, List } from "lucide-react";

const Card = ({ title, count }) => {
    console.log(title, count);
    let icon, color;
    switch (title.toLowerCase()) {
        case "completed":
            icon = <CheckCircle className="w-8 h-8 text-green-500" />;
            color = "bg-green-100 text-green-700";
            break;
        case "pending":
            icon = <Clock className="w-8 h-8 text-yellow-500" />;
            color = "bg-yellow-100 text-yellow-700";
            break;
        case "inprogress":
            icon = <Play className="w-8 h-8 text-blue-500" />;
            color = "bg-blue-100 text-blue-700";
            break;
        case "AllTasks":
            icon = <List className="w-8 h-8 text-green-500" />;
            color = "bg-green-100 text-green-700";
            break;
        default:
            icon = <Clock className="w-8 h-8 text-gray-500" />;
            color = "bg-gray-100 text-gray-700";
    }

    return (
        <div
            className={`flex items-center justify-between p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 ${color}`}
        >
            <div>
                <h4 className="text-lg font-semibold capitalize">{title}</h4>
                <p className="text-2xl font-bold mt-1">{count}</p>
            </div>
            <div>{icon}</div>
        </div>
    );
};

export default Card;
