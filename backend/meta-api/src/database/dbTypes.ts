export interface Document {
    name: String,
    eTag: String,
    tags: Array<String>,
    content: String,
    category: String,
    description: String,
    upload_date: Date,
    thumbnail_etag: String,
    from: Date  //when the document was issued or received by the user
}

export interface User {
    username: String,
    password: String, //sha512 encoded
    nickname: String,
    registration_date: Date,
    permissions: Number
}

export enum CATEGORIES {
    RECEIPT, LETTER, LAW_DOCUMENT,OTHER
}

export enum Permissions {

}