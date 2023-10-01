import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  location: String,
  date: String,
  image: String,
  isFeatured: Boolean,
});

// const EventsModel = mongoose.model('events', eventsSchema);

export default mongoose.models.events || mongoose.model("events", eventsSchema);
