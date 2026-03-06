import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import queryRoutes from "./routes/query.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://mythri:Mythri%40005@cluster0.oxyfatx.mongodb.net/nl_query_db?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Home route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/test", (req, res) => {
  res.send("Backend working!");
});

// ✅ Use routes file
app.use("/query", queryRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});