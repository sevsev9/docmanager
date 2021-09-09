import express from "express";
import dotenv from "dotenv";
import {dbConnect} from "./database/dbUtil";
import session from "express-session";
import cookieParser from "cookie-parser";

const oneDay = 1000 * 60 * 60 * 24;

dotenv.config();

export const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET!,
  saveUninitialized: true,
  cookie: {maxAge: oneDay},
  resave: false
}))

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


