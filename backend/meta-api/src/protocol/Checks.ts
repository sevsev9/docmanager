//@ts-nocheck
import {Document, User} from "../database/dbTypes";

export function checkDocument(doc: Object) {
    return typeof doc.name === "string" &&
        typeof doc.tags === "object" && doc.tags.length > 0 &&
        typeof doc.content === "string" &&
        typeof doc.category === "string" &&
        typeof doc.description === "string" &&
        typeof doc.upload_date === "string" &&
        typeof doc.thumbnail_etag === "string" &&
        typeof doc.from === "object" && typeof doc.from.getDate === "function";
}

export function createDocument(doc: Object) {
    // date has to be formatted like: YYYY-MM-DD`T`HH:MM:SS or otherwise jsDate parsable
    const date = (typeof doc.from.getDate === "function") ? doc.from : new Date(doc.from);
    const upload = (typeof doc.upload_date.getDate === "function") ? doc.upload_date : Date.now();
    return new IDocument(
        doc.name,
        doc.tags,
        doc.content,
        doc.category,
        doc.description,
        upload,
        doc.thumbnail_etag,
        date
    );
}



export function createUser(usr: Object) {
    return new User(
        usr.email,
        usr.password,
        (usr.permissions) ? usr.permissions : 0,
        Date.now(),  //today, now
        (usr.nickname) ? usr.nickname: usr.email.split("@")[0]
    )
}