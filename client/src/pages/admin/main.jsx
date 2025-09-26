import React, { useState } from "react";
import Card from "./card";
import TaskStatsCard from "./taskStatsCard";


const MainPage = () => {
    return (
        <>
            <Card />
            <TaskStatsCard />

            <div className="bg-white p-6 rounded-lg shadow mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Activity
                </h3>
                <ul className="space-y-3 text-gray-700">
                    <li className="border-b pb-2">
                        ✅ Alice completed <span className="font-medium">"Create Task API"</span>
                    </li>
                    <li className="border-b pb-2">
                        ⏳ Bob is working on <span className="font-medium">"UI Dashboard"</span>
                    </li>
                    <li className="border-b pb-2">
                        ✅ Charlie finished <span className="font-medium">"Database Setup"</span>
                    </li>
                </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Analytics (Coming Soon 🚀)
                </h3>
                <p className="text-gray-600">
                    Here you can integrate charts (Recharts/Chart.js) to show task progress,
                    user activity, and system stats.
                </p>
            </div>
        </>
    )
}

export default MainPage
