import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./utils/DB.js";
import productRouter from "./routes/product.js";
import authRouter from "./routes/auth.js";
import orderRouter from "./routes/order.js";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "SHOPHIVE API is running",
  });
});

app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/orders", orderRouter);
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;