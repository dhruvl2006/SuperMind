import mongoose from 'mongoose';
import { exit } from 'process';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database', error);
        exit(-1);
    }
}