import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions)
  } catch (error: any) {
    console.log("DB connection error: ", error.message);
  }

  const connection = mongoose.connection;
  if (connection.readyState >= 1) {
    console.log("DB connected successfully");
  } else {
    connection.on("error", () => {
      console.log("DB connection failed");
    })
  }
}

export default connectDB;