import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config({ path: "./config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);

app.get("/", (req, res, next) => {
  return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})

dbConnection();

app.use(errorMiddleware);

/*
  Agar hum ErrorHandler class ko directly app.use mein use karenge, to woh kaam nahi karega kyunki ErrorHandler 
  ek error object create karne ke liye design ki gayi class hai, na ki ek middleware function. app.use ko ek 
  function chahiye jo req, res, aur next parameters le sake, aur errorMiddleware wahi function hai jo yeh kaam karta hai.
*/

export default app;
