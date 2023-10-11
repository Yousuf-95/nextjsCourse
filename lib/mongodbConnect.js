import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/nextjsCourse";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  console.log("connecting to mongodb");
  cached.conn = await mongoose.connect(MONGODB_URI);

  return cached.conn;
}

export default dbConnect;