import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import eventRoute from "./routes/events.js";

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

//middelware
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);

//connection to server on port 4000
app.listen(4000, () => {
    connect();
    console.log("listening on port 4000");
});