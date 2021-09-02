import express, {Application, Response, Request} from "express";
import dotenv from "dotenv";
import {DocumentModel, UserModel} from "./database/dbSchemas";
import {dbConnect} from "./database/dbUtil";

dotenv.config();

export const app = express();

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


