import {connect} from "mongoose";
import {IDocument, IUser, User} from "../database/dbTypes";
import {UserModel, DocumentModel} from "../database/dbSchemas";
import bcrypt from "bcryptjs";
import {getEmailFromAccessToken} from "./oAuthHelper";
import {createUser} from "../protocol/Checks";

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
export function register(usr: IUser) {
  const user = new UserModel(usr);
  return user.save();
}

export function login(password: string, email?: string) {
  return new Promise<IUser>((resolve, reject) => {// @ts-ignore
    UserModel.find({email: email}, (err, data) => {
      if (err) {
        reject(err);
      } else if (data.length > 0) {
        bcrypt.compare(password, data[0].password).then((res: any) => {
          if (res) {
            resolve(new User(
              data[0].email,
              "",
              data[0].permissions,
              data[0].registration_date,
              data[0].nickname!
            ));
          } else {
            reject("Authentication invalid!");
          }
        }).catch((err: any) => {
          console.log(err);   //@Debug
          reject(err);
        })
      } else {
        reject("User not found with these credentials.") //returns undefined if user is not in database
      }
    })
  })
}

/**
 * Checks if a user is present via email in the database.
 * If present: User will be logged in.
 * If not present: Registration flag will be sent.
 * @param access_token The given access_token.
 * @returns IUser The user to be logged in.
 */
export function checkOAuth(access_token: string) {
  return new Promise<IUser>((resolve, reject) => {
    //get eimail
    getEmailFromAccessToken(access_token).then(nfo => {
      UserModel.find({email: nfo.email}, {password: 0},undefined, (err, data) => {
        if (err) {
          reject(err)
        } else if (data.length > 0) {
          resolve(data[0]);   //return found user
        } else {
          //register user and resolve promise with newly created user
          register(createUser({
            email: nfo.email,
            password: nfo.id,
            permissions: 0,
            registration_date: Date.now(),
            nickname: nfo.name
          })).then(user => {
            resolve(user)
          }).catch(reject);
        }
      })
    }).catch(console.error)
  });
}

export function metaUnique(metadata: IDocument) {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      // @ts-ignore
      const doc: Array<IDocument> = await DocumentModel.findOne({name: metadata.name});

      if (doc === null) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e)
    }
  })
}

