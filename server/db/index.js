import mongoose from "mongoose";
import { config } from "dotenv";


config()
const connection = mongoose.connect(`mongodb+srv://pratya0011:${process.env.PASSWORD}@cluster0.o1efyoe.mongodb.net/?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default connection;
