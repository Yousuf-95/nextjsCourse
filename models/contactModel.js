import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  email: String,
  name: String,
  message: String,
});

export default mongoose.models.contactmessages || mongoose.model("contactmessages", contactSchema);
