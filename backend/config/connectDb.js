import mongoose from "mongoose";

const connect = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDb Connected Successfully");
  } catch (error) {
    console.log("❌ MongoDb Connection Error", error.message);
    process.exit(1);
  }
};
export default connect;
