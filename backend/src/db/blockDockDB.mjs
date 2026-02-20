import mongoose from 'mongoose';
import AppError from '../Models/AppError.mjs';

export const connectDb = async () => {
  try {
    console.log('MongoDB uri:', process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (conn) {
      console.log(`Database running on: ${conn.connection.host}`);
    }
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};
