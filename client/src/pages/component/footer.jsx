import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-amber-200 text-gray-800 py-10 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex flex-col items-start">
                    <h2 className="text-2xl font-extrabold mb-2">Taskify App</h2>
                    <p className="text-gray-700 max-w-xs">
                        Manage your tasks efficiently. Stay organized and productive with Taskify.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                    <a href="#" className="hover:text-red-500 transition">Home</a>
                    <a href="#" className="hover:text-red-500 transition">Tasks</a>
                    <a href="#" className="hover:text-red-500 transition">Projects</a>
                    <a href="#" className="hover:text-red-500 transition">Contact</a>
                </div>

                <div className="flex gap-4 text-gray-700">
                    <a href="https://www.instagram.com/rdjkashyap/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
                        <FaInstagram size={20} />
                    </a>
                    <a href="https://www.facebook.com/radheydhruvjagannath" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
                        <FaFacebookF size={20} />
                    </a>
                    <a href="https://x.com/JayKashyap32254" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
                        <FaTwitter size={20} />
                    </a>
                    <a href="https://github.com/Rdjai" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
                        <FaGithub size={20} />
                    </a>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <input
                        type="email"
                        placeholder="Subscribe to newsletter"
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                        Subscribe
                    </button>
                </div>
            </div>

            <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} Taskify App. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
