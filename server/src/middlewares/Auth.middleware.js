import { verifyToken } from '../utils/jwt.js'

export const authMiddlewere = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({
            error: "Unauthorized: Missing or invalid token format"
        })
        const token = authHeader.split(" ")[1];
        console.log("token", token);
        const decode = verifyToken(token);
        console.log("decoded", decode);
        if (!decode) return res.status(401).json({
            error: "Unauthorized: Invalid or expired token."
        })
        console.log(decode);
        req.user = decode;
        next()
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
}


export const checkRole = (role) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized: No user found" });
            }

            if (req.user.role !== role) {
                return res.status(403).json({ message: "Forbidden: Access denied" });
            }

            next();
        } catch (err) {
            console.error("Role check error:", err);
            res.status(500).json({ message: "Server error in role checking" });
        }
    };
};