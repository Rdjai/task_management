import UserModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateJwt } from '../utils/jwt.js'
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select("-password");
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await UserModel.findById(req.params.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        user.role = role || user.role;
        await user.save();

        return res.status(200).json({ message: "User role updated", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteUser = async (req, res) => {
    console.log("Attempting to delete user with ID:", req.params.id);

    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        console.error("Error deleting user:", error.message);
        console.log("Error deleting user:", error.message);
        return res.status(500).json({
            message: "Server error during deletion.",
            "Error deleting user:": error.message
        });
    }
};
export const registerUser = async (req, res) => {
    console.log("Register body:", req.body);
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashpass = await bcrypt.hash(password, 5);

        const user = await UserModel.create({
            name: name,
            email: email,
            password: hashpass,
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid user data" });
        }
        const generateToken = generateJwt({ id: user._id });

        return res.status(201).json({
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken,
        })
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found, check email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = generateJwt({ id: user._id });

        return res.status(200).json({
            status: 200,
            user: {
                name: user.name,
                role: user.role,
                token: token,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const userProfile = async (req, res) => {
    try {

        const user = await UserModel.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}