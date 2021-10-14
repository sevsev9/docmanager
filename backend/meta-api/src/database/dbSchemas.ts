//@ts-nocheck
import {model, Schema} from "mongoose";
import {IDocument, IUser} from "./dbTypes";

const dbDocument = new Schema<IDocument>({
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

const dbUser = new Schema<IUser>({
    email: {type: String, required: true, unique: true},    //Primary Identifier
    password: {type: String, required: true}, //sha512 encoded
    nickname: {type: String, required: false},
    registration_date: {type: Number, required: true},
    permissions: {type: Number, required: false, default: 0} // 0 -> normal user | 1 -> admin user | following are reserved
});

export let UserModel = model<IUser>('User',dbUser);
export let DocumentModel = model<IDocument>('Document', dbDocument);
