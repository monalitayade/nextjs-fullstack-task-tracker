import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

console.log("MONGODB_URI", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("Please define mongo env variable at local");
}

// let cached = global.mongoose || { conn: null, promise: null };

// async function connectToDatabase() {
//   if (cached.conn) return cached.conn;
//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then((mongoose) => mongoose);
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectToDatabase;

// const connectToDatabase = async () => {
//   if (mongoose.connection.readyState >= 1) return; // If already connected, skip

//   try {
//     await mongoose.connect(process.env.MONGODB_URI); // Use your MongoDB URI here
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw new Error("Failed to connect to MongoDB");
//   }
// };

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const opts = {
    bufferCommands: false,
  };

  await mongoose.connect(MONGODB_URI, opts);
  return mongoose;
}

export default connectToDatabase;
