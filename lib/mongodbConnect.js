import mongoose from "mongoose";

var mongooseInstance;

async function connectDb() {
  if (!mongooseInstance) {
    mongooseInstance = await mongoose.connect(
      "mongodb://127.0.0.1:27017/nextjsCourse"
    );
    console.log("Connected to MongoDB");
    return mongooseInstance;
  }

  return mongooseInstance;
}

export default connectDb;
