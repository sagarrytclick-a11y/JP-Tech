import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI?.trim() || 'mongodb://127.0.0.1:27017/jptechnologies';

const cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        // Fail fast instead of letting requests hang when the database is down.
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        bufferCommands: false,
      })
      .catch((error) => {
        // Allow the next request to retry instead of caching a rejected promise.
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
