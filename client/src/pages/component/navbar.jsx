import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SiTask } from "react-icons/si";
import { HiMenu, HiX } from "react-icons/hi";
import { SparklesText } from "@/components/ui/sparkles-text";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        };

        checkAuth();
        window.addEventListener("storage", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, []);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <SiTask className="w-[35px] h-[35px] text-red-600" />
                    <SparklesText className="text-2xl font-bold colors-primary">
                        Taskify
                    </SparklesText>
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="colors-primary hover:text-red-600 font-medium transition">
                        Home
                    </Link>
                    <a href="https://rdjkashyap.vercel.app/" target="_blank" className="colors-primary hover:text-red-600 font-medium transition">
                        Portfolio
                    </a>
                    <a href="https://github.com/Rdjai" target="_blank" className="colors-primary hover:text-red-600 font-medium transition">
                        Github
                    </a>
                    <a href="https://www.linkedin.com/in/rdjkashyap/" target="_blank" className="colors-primary hover:text-red-600 font-medium transition">
                        Contact
                    </a>

                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/signup"
                                className="cursor-pointer px-4 py-1 rounded-xl border border-red-600 text-red-600 font-medium hover:border-black hover:text-black hover:shadow-soft transition"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="px-4 py-1 font-medium transition rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg"
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/dashboard"
                            className="px-4 py-1 font-medium transition rounded-lg bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg"
                        >
                            Dashboard
                        </Link>
                    )}
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <HiX className="w-6 h-6 text-gray-800" /> : <HiMenu className="w-6 h-6 text-gray-800" />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-md">
                    <Link to="/" className="block py-2 font-medium hover:text-red-600">
                        Home
                    </Link>
                    <Link to="/about" className="block py-2 font-medium hover:text-red-600">
                        About
                    </Link>
                    <Link to="#" className="block py-2 font-medium hover:text-red-600">
                        Services
                    </Link>
                    <Link to="#" className="block py-2 font-medium hover:text-red-600">
                        Contact
                    </Link>

                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/signup"
                                className="block py-2 px-4 border border-red-600 text-red-600 rounded-lg text-center font-medium hover:bg-red-100"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="block py-2 px-4 bg-red-500 text-white rounded-lg text-center font-medium hover:bg-red-600"
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/dashboard"
                            className="block py-2 px-4 bg-green-500 text-white rounded-lg text-center font-medium hover:bg-green-600"
                        >
                            Dashboard
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
