import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  registeredAt: Date,
  amount: Number
});

export default mongoose.model("User", UserSchema);