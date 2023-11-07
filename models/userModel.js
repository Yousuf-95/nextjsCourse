import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  signupDate: { type: Date, default: Date.now },
});

export default mongoose.models.users || mongoose.model("users", UserSchema);