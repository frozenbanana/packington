import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://henry:sallad123@nung.lbrqezw.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(`Failed to connect to MongoDB with error: ${err}`);
        process.exit(1);  // Exit with failure code
    }
}

export default connectDB;
