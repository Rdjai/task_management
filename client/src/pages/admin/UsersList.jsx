import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/api/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PuffLoader } from "react-spinners";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await getAllUsers();
                setUsers(res.data);
                setFilteredUsers(res.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [search, users]);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">All Users</h2>


            <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />


            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <PuffLoader color="#F59E0B" size={50} />
                </div>
            ) : (
                <ScrollArea className="max-h-[400px] overflow-auto transition-all duration-500 ease-in-out">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Email</th>
                                <th className="p-2 border">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        <td className="p-2 border">{user.name}</td>
                                        <td className="p-2 border">{user.email}</td>
                                        <td className="p-2 border">{user.role}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="p-2 border text-center" colSpan={3}>
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </ScrollArea>
            )}
        </div>
    );
};

export default UsersList;
