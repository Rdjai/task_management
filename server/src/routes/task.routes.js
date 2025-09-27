import express from "express";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getTaskCount,
    getTasksByDeadline,
    getTaskSummary,
    getAllTasks,
} from "../controllers/task.controller.js";
import { authMiddlewere } from "../middlewares/Auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

// router.use(authMiddlewere);

router.post("/create", authMiddlewere, roleMiddleware, createTask);
router.get("/Mytask", authMiddlewere, getTasks);
router.get("/Alltask", authMiddlewere, roleMiddleware, getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", authMiddlewere, updateTask);
router.delete("/:id", deleteTask);

router.get("/stats/count", getTaskCount);
router.get("/stats/deadline", getTasksByDeadline);
router.get("/stats/summary", getTaskSummary);

export default router;
