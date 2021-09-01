//@ts-nocheck
import {model, Schema} from "mongoose";
import {Document, User} from "./dbTypes";

const dbDocument = new Schema<Document>({
    name: {type: String, required: true},
    tags: {type: Array, required: true},
    content: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    upload_date: {type: Date, required: true},
    from: {type: Date, required: false}  //when the document was issued or received
});

const dbUser = new Schema<User>({
    username: {type: String,required: true},
    password: {type: String, required: true}, //sha512 encoded
    nickname: {type: String, required: true},
    registration_date: {type: Date, required: true},
    permissions: {type: Number, required: false, default: 0}
});

export let UserModel = model<User>('User',dbUser);
export let DocumentModel = model<Document>('Document', dbDocument);
