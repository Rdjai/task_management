import express from "express";
import { login, registerUser, userProfile, deleteUser, getUsers, updateUserRole } from "../controllers/user.controller.js";
import { authMiddlewere } from "../middlewares/Auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", login);
router.get("/user/me", authMiddlewere, userProfile);

router.get("/", roleMiddleware, getUsers);
router.put("/update/:id/role", roleMiddleware, updateUserRole);
router.delete("/delete/:id", roleMiddleware, deleteUser);

export default router
