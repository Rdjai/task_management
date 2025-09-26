import jwt from "jsonwebtoken";


export const generateJwt = (payload) => {
    return jwt.sign(payload, process.env.JWT_TOKEN,);
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_TOKEN)
    } catch (error) {
        return null;
    }
}