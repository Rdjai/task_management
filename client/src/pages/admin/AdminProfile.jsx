import React, { useEffect, useState } from "react";
import { getProfile } from "@/api/api";
import { ScrollArea } from "@/components/ui/scroll-area";

const UserProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const res = await getProfile();
                const user = res.data || {};

                setProfile(user);
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);
    console.log(profile);
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-700 text-lg">Loading profile...</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-700 text-lg">No profile data available.</p>
            </div>
        );
    }

    return (
        <ScrollArea className="p-6 max-w-xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h1>

                <div className="flex gap-5">
                    <p className="text-gray-600 font-medium">Name:</p>
                    <p className="text-gray-800">{profile.name}</p>
                </div>

                <div className="flex gap-5">
                    <p className="text-gray-600 font-medium">Email:</p>
                    <p className="text-gray-800">{profile.email}</p>
                </div>

                <div className="flex gap-5">
                    <p className="text-gray-600 font-medium">Role:</p>
                    <p className="text-gray-800">{profile.role || "User"}</p>
                </div>

                {/* Optional: Add other fields if your user has them */}
            </div>
        </ScrollArea>
    );
};

export default UserProfilePage;
