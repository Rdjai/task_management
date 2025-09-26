import UserModel from "../models/user.model.js";


export const roleMiddleware = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            error: "Authentication failed. User ID missing."
        });
    }

    try {
        const checkUser = await UserModel.findById(req.user.id);
        if (!checkUser) {
            return res.status(401).json({
                error: "User not found."
            });
        }
        if (checkUser.role === "admin") {
            req.fullUser = checkUser;
            return next();
        }
        else {
            return res.status(403).json({
                error: "Access denied. Requires admin privileges."
            });
        }
    } catch (error) {
        console.error("Database error in roleMiddleware:", error);
        return res.status(500).json({
            error: "Internal server error."
        });
    }
}