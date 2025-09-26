import express from "express";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserStats,
    getTaskStats,
} from "../controllers/admin.controller.js";
import { authMiddlewere, checkRole } from "../middlewares/Auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();


router.get("/search/all", getAllUsers);
router.get("/search/single", authMiddlewere, roleMiddleware, getUserById);
router.put("/updata", authMiddlewere, roleMiddleware, updateUser);
router.delete("/:id", deleteUser);

router.get("/stats/users", authMiddlewere, roleMiddleware, getUserStats);
router.get("/stats/tasks", authMiddlewere, roleMiddleware, getTaskStats);

export default router;
