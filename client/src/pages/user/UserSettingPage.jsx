import React, { useEffect, useState } from "react";
import { getProfile, updateUser } from "@/api/api";
import { toast } from "react-toastify";

const UserSettingPage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      // Use optional chaining to avoid undefined errors
      const user = res.data?.user || {};
      setProfile((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("Failed to load profile");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (profile.password && profile.password !== profile.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setUpdating(true);
    try {
      const updateData = {
        name: profile.name,
        email: profile.email,
        ...(profile.password ? { password: profile.password } : {}),
      };
      await updateUser("me", updateData); // make sure API supports "me"
      toast.success("Profile updated successfully!");
      setProfile((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
    }
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">New Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Leave empty if not changing"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={profile.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Repeat new password"
          />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UserSettingPage;
