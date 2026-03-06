
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import queryRoutes from "./routes/query.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/query", queryRoutes);

mongoose.connect(process.env.MONGO_URI);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});