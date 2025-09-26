import Task from "../models/task.model.js";


export const createTask = async (req, res) => {
    try {
        const { title, description, deadline, status, assignedTo } = req.body;

        if (!assignedTo) {
            return res.status(400).json({ message: "assignedTo is required" });
        }

        const task = new Task({
            title,
            description,
            deadline,
            status: status || "pending",
            assignedTo,
            createdBy: req.user.id,
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        console.error("CreateTask Error:", error.message);
        res.status(500).json({ message: "Server error creating task" });
    }
};



export const getTasks = async (req, res) => {
    try {
        let tasks;
        if (req.user.role === "admin") {
            tasks = await Task.find().populate("user", "name email");
        } else {
            tasks = await Task.find({ user: req.user._id });
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching tasks" });
    }
};


export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("user", "name email");
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (req.user.role !== "admin" && task.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching task" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, deadline, status } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (deadline) task.deadline = deadline;
        if (status) task.status = status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Server error updating task" });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await task.deleteOne();
        res.json({ message: "Task removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error deleting task" });
    }
};

export const getTaskCount = async (req, res) => {
    try {
        const total = await Task.countDocuments({ user: req.user._id });
        res.json({ totalTasks: total });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching task count" });
    }
};


export const getTasksByDeadline = async (req, res) => {
    try {
        const { before } = req.query;
        if (!before) {
            return res.status(400).json({ message: "Please provide a 'before' date query param" });
        }

        const tasks = await Task.find({
            user: req.user._id,
            deadline: { $lte: new Date(before) },
        });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching tasks by deadline" });
    }
};


export const getTaskSummary = async (req, res) => {
    try {
        const completed = await Task.countDocuments({ user: req.user._id, status: "completed" });
        const pending = await Task.countDocuments({ user: req.user._id, status: "pending" });

        res.json({ completed, pending });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching summary" });
    }
};
