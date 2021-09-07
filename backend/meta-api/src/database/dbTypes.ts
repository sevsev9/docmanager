export interface Document {
  name: String,
  type: Object,
  eTag: String,
  size: Number, // number of the filesize in kB
  tags: Array<String>,
  category: String,
  description: String,
  upload_date: Date,
  access: Array<Object>,
  //Optionals
  thumbnail_etag?: String, //if empty -> default thumbnail will be used
  content?: String,  //contains some sort of document contend, can be html formatted
  from?: Date  //when the document was issued or received by the user
  additional_info?: Object
}

export interface User {
  username: String,
  password: String, //sha512 encoded
  email: String,
  nickname: String,
  registration_date: Date,
  permissions: Number //
}

export enum CATEGORIES {
  RECEIPT, LETTER, LAW_DOCUMENT, OTHER
}


/**
 * Bitset permissions:
 * Bit 0: READ,
 * Bit 1: WRITE
 * Bit 2: MODIFY
 * Bit 3: DELETE
 * Bit 4: CREATOR
 */
export enum Permissions {
  READ, WRITE, MODIFY, DELETE, CREATOR
}

/**
 * Calculates the integer from given permission(s). Operates as a bitset.
 * @param list A String Array containing one or multiple permissions.
 */
export function getPermissions(list: Array<String>) {
  //@Todo
}

const x = {
  _id: "MongoDB ObjectID",
  name: "descriptive document.extension",
  type: "some file type, e.g.: { 'type': 'image', 'extension': 'png'}",
  etag: "minio-etag",
  content: "<p>Some content which is in the file. this is optional and can be formatted in <b>html</b>.</p>",
  access: [
    {user: "some user _id", role: "Integer: A Bitset of 4 Bits: bit 0 -> read, 1 -> write, 3 -> modify, 4 -> delete"}
  ],
  from: "Date: uploaded",
  created: "Date: When the document was created",
  category: "The document category: e.g. 'receipt' or 'postal document'",
  additional_info: "Object: some additional info for the file",
  thumbnail_etag: "eTag of the minio thumbnail file. if left empty a default thumbnail will be used."
}