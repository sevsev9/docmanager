import {connect} from "mongoose";

export function dbConnect(host: String, port: Number | String, database: String, username: String, password: String) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            await connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, {
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

