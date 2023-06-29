import express from "express";
import bodyParser from "body-parser";
import connection from "./db/index.js";
import adminRouter from "./routes/AdminAuth.js";
import userRouter from "./routes/UserAuth.js"
import adminDashboad from "./routes/AdminDashboard.js"
import homeRouter from "./routes/homeRouts.js"

import { config } from "dotenv";
config()
const app = express()
app.use(bodyParser.json())

app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/admin', adminDashboad)
app.use('/user',homeRouter)

connection.then(()=>app.listen(process.env.PORT, ()=>{
    console.log('server listening on port 8080')
    console.log('connected to mongoDB')
})).catch((err)=>{
    console.log('server failed to listen with error', err)
});

