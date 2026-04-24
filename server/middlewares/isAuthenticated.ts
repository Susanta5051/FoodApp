import type {NextFunction, Request ,Response} from 'express' 
import jwt from 'jsonwebtoken'
import Mongoose from 'mongoose';

declare global { 
    namespace Express{
        interface Request{
            id:Mongoose.Schema.Types.ObjectId;
        }
    }
}


export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User is not authenticated"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY!
        ) as jwt.JwtPayload;

        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        req.id = new Mongoose.Types.ObjectId(decoded.userId);

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        });
    }
};