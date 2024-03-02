import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToMongoDB = async () => {
    try {
        // Use useNewUrlParser and useUnifiedTopology options
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("mongodb connected");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
};

export default connectToMongoDB;
