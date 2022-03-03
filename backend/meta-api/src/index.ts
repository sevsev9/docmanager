import express from "express";
import dotenv from "dotenv";
import {dbConnect} from "./helper/dbUtil";
import session, {MemoryStore} from "express-session";
import {IUser} from "./database/dbTypes";
import userRouter from "./routes/userRoutes";
import fileRouter from "./routes/fileRoutes"

const sessionStore = new MemoryStore();

dotenv.config();

declare module "express-session" {
  interface SessionData {
    user: IUser,
    views: number
  }
}

export const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}));
// Enable CORS
app.use(function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.urlencoded({extended: false, limit: '2gb'}));
app.use(express.json({limit: '2gb'}));

app.use("/user", userRouter);
app.use("/file", fileRouter)

app.get('/sess', (req, res) => {
  // @ts-ignore
  res.send(sessionStore.sessions)
  console.log(req.sessionID)
})


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


