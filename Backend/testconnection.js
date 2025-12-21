import mongoose from "mongoose";

const uri =
  "mongodb+srv://ecommerce-admin:EYK1LEAgyG3mQDz1@cluster0.smyqv6o.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";

console.log("Testing MongoDB Atlas connection...");

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ SUCCESS! Connected to MongoDB Atlas");
    console.log("Database: ecommerce");
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ ERROR:", err.message);

    // Common fixes
    if (err.message.includes("authentication")) {
      console.log("\n🔑 Authentication failed. Check:");
      console.log("1. Username: ecommerce-admin");
      console.log("2. Password: EYK1LEAgyG3mQDz1");
      console.log("3. Network Access: 0.0.0.0/0 should be active");
    }

    if (err.message.includes("ENOTFOUND") || err.message.includes("querySrv")) {
      console.log("\n🌐 Network error. Check:");
      console.log("1. Internet connection");
      console.log("2. Cluster URL: cluster0.smyqv6o.mongodb.net");
    }

    process.exit(1);
  });
