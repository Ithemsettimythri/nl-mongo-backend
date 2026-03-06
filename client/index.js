import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import queryRoutes from "./routes/query.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/query", queryRoutes);

mongoose.connect(process.env.MONGO_URI);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
