import express from "express";
import dotenv from "dotenv";
import {dbConnect} from "./database/dbUtil";

dotenv.config();

export const app = express();
app.use(express.json());

dbConnect(
    process.env.MONGODB_HOST!,
    process.env.MONGODB_PORT!,
    process.env.MONGODB_AUTHDATABASE!,
    process.env.MONGODB_USER!,
    process.env.MONGODB_PASSWORD!
).then(msg => {
    console.log(msg);
    app.listen(process.env.PORT, () => {
        console.log(`API running on port ${process.env.PORT}`);
    });
}).catch(err => {
    console.log(err);
    process.exit(-1);
})


