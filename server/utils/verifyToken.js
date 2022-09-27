import jwt, { verify } from "jsonwebtoken";
import { createError } from "../utils/error.js"

//Verifty that the user has a jwt
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    //if no token exists, return this error
    if(!token) {
        return next(createError(401, "You are not authenticated"))
    }

    // verify the jwt
    jwt.verify(token,proceses.env.JWT, (err, user) => {
        if(err) {
            return next(createError(403, "Token is not valid"))
        }

        req.user = user;
        next()
    });
};

// Verify that the user is a real user
export const verifyUser = (req, res, next) => {
    verifyToken(req,res,next , () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            if (err) {
                return next(createError(403, "You are not authorized"))
            }
        }
    });
};

// Verify if user is admin.
export const verifyAdmin = (req, res, next) => {
    verifyToken(req,res,next, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            if (err) {
                return next(createError(403, "You are not authorized"))
            }
        }
    });
};