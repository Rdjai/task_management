// controllers/adminController.js
import User from "../models/user.model.js";
import Task from "../models/task.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching users" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "Authentication failed. User ID missing." });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.json(user);
    } catch (err) {
        console.error("❌ getUserById Error:", err);
        res.status(500).json({ error: "Server error", details: err.message });

    }
};


export const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        if (email) user.email = email;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error updating user" });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.deleteOne();
        res.json({ message: "User removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error deleting user" });
    }
};


export const getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAdmins = await User.countDocuments({ role: "admin" });
        const totalRegularUsers = await User.countDocuments({ role: "user" });

        res.json({
            totalUsers,
            totalAdmins,
            totalRegularUsers,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching user stats" });
    }
};

export const getTaskStats = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({ status: "completed" });
        const pendingTasks = await Task.countDocuments({ status: "pending" });


        const tasksByUser = await Task.aggregate([
            { $group: { _id: "$user", taskCount: { $sum: 1 } } },
        ]);

        res.json({
            totalTasks,
            completedTasks,
            pendingTasks,
            tasksByUser,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching task stats" });
    }
};
