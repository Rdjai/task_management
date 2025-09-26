// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-amber-200 to-orange-300 px-4 text-center">

            {/* Animated 404 */}
            <motion.h1
                className="text-7xl font-bold text-red-600 mb-4"
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                404
            </motion.h1>

            <motion.h2
                className="text-3xl font-semibold mb-2 text-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Page Not Found
            </motion.h2>

            <motion.p
                className="text-gray-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Oops! The page you're looking for doesn't exist or has been moved.
            </motion.p>

            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Link
                    to="/"
                    className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition"
                >
                    Go Back Home
                </Link>
            </motion.div>

            {/* Floating circles animation */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full opacity-30"
                        style={{
                            width: `${20 + i * 10}px`,
                            height: `${20 + i * 10}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{ y: [0, -50, 0], x: [0, 50, 0] }}
                        transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
