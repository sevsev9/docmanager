import {connect} from "mongoose";
import {User, Document} from "./dbTypes";
import {UserModel, DocumentModel} from "./dbSchemas";
import {rejects} from "assert";

export function dbConnect(host: String, port: Number | String, authDatabase: String, username: String, password: String) {
  return new Promise<string>(async (resolve, reject) => {
    try {
      await connect(`mongodb://${username}:${password}@${host}:${port}/?authSource=${authDatabase}&readPreference=primary`, {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } catch (error: any) {
      reject(error);
    }
    resolve("Successfully connected to MongoDB Server!");
  })
}

/**
 * Creates a new user and returns a promise when the user has been created.
 * @param usr Data of the user to be created.
 */
export function register(usr: User) {
  const user = new UserModel(usr);
  return user.save();
}

export function login(password: String, username?: String, email?: String) {
  return new Promise<User>((resolve, reject) => {// @ts-ignore
    UserModel.find({$or: {username: username, email: email}, password: password}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

