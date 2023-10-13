import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  id: String,
  email: String,
  name: String,
  text: String,
  eventId: String
});

export default mongoose.models.comments ||
  mongoose.model("comments", CommentSchema);
