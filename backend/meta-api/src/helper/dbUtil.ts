import {connect} from "mongoose";
import {IUser, User} from "../database/dbTypes";
import {UserModel} from "../database/dbSchemas";
import bcrypt from "bcryptjs";
import {getEmailFromAccessToken, testAccessToken} from "./oAuthHelper";

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
 * @returns IUser If logged in or undefined if the user may proceed with registration.
 */
export function checkOAuth(access_token: string) {
    return new Promise<IUser | undefined>((resolve, reject) => {
        //get eimail
        getEmailFromAccessToken(access_token).then(mail => {
            UserModel.find({email: mail}, (err, data) => {
                if (err) {
                    reject(err)
                } else if (data.length > 0) {
                    resolve(data[0]);   //return found user
                } else {
                    //create user
                    const usr = new User(
                      data[0].email,
                      "",
                      data[0].permissions,
                      data[0].registration_date,
                      data[0].nickname!
                    );

                    //resolve promise
                    register(usr).then(() => {
                        resolve(usr)
                    }).catch(reject);
                }
            }).catch((err: any) => {
                console.log(err);
                reject(err);
            })
        })

    });
}
