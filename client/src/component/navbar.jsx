import React from "react";
import { SparklesText } from "@/components/ui/sparkles-text"
import { Link } from "react-router-dom";
import { SiTask } from "react-icons/si";
import { Highlighter } from "@/components/ui/highlighter"


const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-screen-xl mx-auto px-4 py-5 flex items-center justify-between">

                <Link to="/" className="flex items-center space-x-2">

                    <SiTask className="w-[35px] h-[35px] text-red-600" width={220} />
                    <SparklesText className="text-2xl font-bold colors-primary">Taskify</SparklesText>
                </Link>
                <p className="hidden md:block text-lg">
                    The{" "}
                    <Highlighter action="underline" color="#FF9800">
                        Taskify App
                    </Highlighter>{" "}
                    helps you{" "}
                    <Highlighter action="highlight" color="#87CEFA">
                        organize smarter
                    </Highlighter>{" "}
                    and{" "}
                    <Highlighter action="highlight" color="#4CAF50">
                        achieve more
                    </Highlighter>
                    .
                </p>
                {/* Menu + Auth */}
                <div className="flex items-center space-x-6">
                    <Link
                        to="/"
                        className="colors-primary hover:text-red-600 font-medium transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="colors-primary hover:text-red-600 font-medium transition"
                    >
                        About
                    </Link>
                    <Link
                        to="#"
                        className="colors-primary hover:text-red-600 font-medium transition"
                    >
                        Services
                    </Link>
                    <Link
                        to="#"
                        className="colors-primary hover:text-red-600 font-medium transition"
                    >
                        Contact
                    </Link>
                    <Link to="/signup" className="cursor-pointer px-4 py-1 rounded-xl bg-transparent text-red-600 border border-red-600 font-medium 
                   hover:border-black   hover:text-black hover:shadow-soft transition">
                        Register
                    </Link>

                    <Link
                        to="/login"
                        className="px-4 py-1  font-medium  transition cursor-pointer rounded-lg front-semibold  duration-300 focus:outline-none bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg"
                    >
                        Login
                    </Link>
                    {/* <CButton label="Sign Up" onClick={() => alert("Ordered!")} /> */}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
