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
        return res.status(201).json(createdTask);
    } catch (error) {
        console.error("CreateTask Error:", error.message);
        return res.status(500).json({ message: "Server error creating task" });
    }
};


export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .sort({ createdAt: -1 });

        res.status(200).json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching tasks" });
    }
};
export const getTasks = async (req, res) => {
    try {
        let tasks;

        if (req.user.role === "admin") {
            tasks = await Task.find().populate("assignedTo", "name email");
        } else {
            tasks = await Task.find({ assignedTo: req.user.id }).populate("assignedTo", "name email");
        }

        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Server error fetching tasks" });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("user", "name email");
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (req.user.role !== "admin" && task.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ message: "Server error fetching task" });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ message: "Status is required" });

    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        console.error("Update task error:", error);
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
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error deleting task" });
    }
};

export const getTaskCount = async (req, res) => {
    try {
        const total = await Task.countDocuments({ user: req.user._id });
        return res.status(200).json({ total });
    } catch (error) {
        return res.status(500).json({ message: "Server error fetching task count" });
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

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Server error fetching tasks by deadline" });
    }
};


export const getTaskSummary = async (req, res) => {
    try {
        const completed = await Task.countDocuments({ user: req.user._id, status: "completed" });
        const pending = await Task.countDocuments({ user: req.user._id, status: "pending" });

        return res.status(200).json({ completed, pending });
    } catch (error) {
        return res.status(500).json({ message: "Server error fetching summary" });
    }
};
