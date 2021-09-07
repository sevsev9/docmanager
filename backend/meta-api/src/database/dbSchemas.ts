//@ts-nocheck
import {model, Schema} from "mongoose";
import {Document, User} from "./dbTypes";

const dbDocument = new Schema<Document>({
    name: {type: String, required: true, unique: true},
    type: {type: Object, required: true},
    etag: {type: String, required: true, unique: true},
    tags: {type: Array, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    upload_date: {type: Date, required: true},
    access: {type: Array, required: true},
    // Optionals
    thumbnail_etag: {type: String, required: false},
    content: {type: String, required: false},
    from: {type: Date, required: false}, //when the document was issued or received by the user
    additional_info: {type: Object, required: false},
});

const dbUser = new Schema<User>({
    username: {type: String,required: true, unique: true},
    password: {type: String, required: true}, //sha512 encoded
    email: {type: String, required: true, unique: true},
    nickname: {type: String, required: true},
    registration_date: {type: Date, required: true},
    permissions: {type: Number, required: false, default: 0} // 0 -> normal user | 1 -> admin user | following are reserved
});

export let UserModel = model<User>('User',dbUser);
export let DocumentModel = model<Document>('Document', dbDocument);
