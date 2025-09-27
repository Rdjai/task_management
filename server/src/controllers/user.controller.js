import UserModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateJwt } from '../utils/jwt.js'
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select("-password");
        res.json(users);
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

        res.json({ message: "User role updated", user });
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

        return res.json({ message: "User deleted successfully" });

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
        if (!email || !password) res.status(400).json({
            message: "something went wrong"
        })
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({
            message: "something went wrong chech email or password"
        })
        const plainPass = bcrypt.compare(password, user.password);
        if (!plainPass) return res.status(401).json({
            message: "something went wrong"
        })
        const token = generateJwt({
            id: user._id
        });
        return res.status(200).json({
            status: 200,
            user: {
                Name: user.name,
                email: user.email,
                role: user.role,
                token: token
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const userProfile = async (req, res) => {
    try {

        const user = await UserModel.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.json({
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}