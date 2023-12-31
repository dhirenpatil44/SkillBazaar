import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoute from "./routes/userRoute.js"
import reviewRoute from "./routes/reviewRoute.js"
import messageRoute from "./routes/messageRoute.js"
import conversationRoute from "./routes/conversationRoute.js"
import orderRoute from "./routes/orderRoute.js"
import gigRoute from "./routes/gigRoute.js"
import authRoute from "./routes/authRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
dotenv.config()
const PORT = process.env.PORT || 8800

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log("Connected to MongoDb!")
  } catch (error) {
    console.log(error)
    console.log("MONGO ERRRRROR")
  }
}

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: "*", credentials: true }));

app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res?.status(errorStatus)?.send(errorMessage);
})

app.listen(PORT, () => {
  connect()
  console.log("Beckend is running")
})