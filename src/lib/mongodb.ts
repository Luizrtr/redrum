import mongoose, { ConnectOptions } from "mongoose";

export const connectMongoDB = async () => {
  try {
    const uri = process.env.MONGODB ?? "";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};
