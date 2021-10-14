import express from "express";
import dotenv from "dotenv";
import {dbConnect} from "./database/dbUtil";
import session from "express-session";
import {IUser} from "./database/dbTypes";
import userRouter from "./routes/userRoutes";

const oneDay = 1000 * 60 * 60 * 24;

dotenv.config();

declare module "express-session" {
  interface SessionData {
    user: IUser,
    views: number
  }
}

export const app = express();
// Enable CORS
app.use(function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SESSION_SECRET!,
  saveUninitialized: true,
  cookie: {maxAge: oneDay},
  resave: false
}));
app.use("/user", userRouter);



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


