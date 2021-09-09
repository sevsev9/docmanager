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
    return new Document({
        name: doc.name,
        tags: doc.tags,
        content: doc.content,
        category: doc.category,
        description: doc.description,
        upload_date: upload,
        thumbnail_etag: doc.thumbnail_etag,
        from: date
    });
}

export function createUser(usr: Object) {
    return new User({
        username: usr.username,
        password: usr.password,
        email: usr.email,
        nickname: usr.nickname,
        registration_date: Date.now(),  //today, now
        permissions: usr.permissions
    })
}