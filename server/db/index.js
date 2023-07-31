import mongoose from "mongoose";
import { config } from "dotenv";


config()
const connection = mongoose.connect(process.env.MONGODB,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default connection;
