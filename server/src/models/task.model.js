// models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "done"],
            default: "pending",
        },
        deadline: {
            type: Date,
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // task is assigned to a user
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // usually an admin
            required: true,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
