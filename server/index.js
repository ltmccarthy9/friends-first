import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import eventRoute from "./routes/events.js";
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

//connection to mongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
    } catch {
        throw error
    }
};

// mongoDB disconnection listener
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
});

// mongoDB connection listener
mongoose.connection.on("connected", () => {
    console.log("mongoDB connected")
});

//middleware
app.use(cookieParser());
app.use(express.json());

// router middleware
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);

// custom error middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong."
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

//connection to server on port 4000
app.listen(3000, () => {
    connect();
    console.log("listening on port 4000");
});