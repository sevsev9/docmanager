export interface Document {
    name: String,
    tags: Array<String>,
    content: String,
    category: String,
    description: String,
    upload_date: Date,
    from: Date  //when the document was issued or received
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