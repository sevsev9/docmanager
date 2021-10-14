export interface IDocument {
  name: string,
  type: Object,
  eTag: string,
  size: Number, // number of the filesize in kB
  tags: Array<string>,
  category: string,
  description: string,
  upload_date: Date,
  access: Array<Object>,
  //Optionals
  thumbnail_etag?: string, //if empty -> default thumbnail will be used
  content?: string,  //contains some sort of document contend, can be html formatted
  from?: Date  //when the document was issued or received by the user
  additional_info?: Object
}

export class Document implements IDocument{
  name: string;
  type: Object;
  eTag: string;
  size: Number;
  tags: Array<string>;
  category: string;
  description: string;
  upload_date: Date;
  access: Array<Object>;

  additional_info?: Object;
  content?: string;
  from?: Date;
  thumbnail_etag?: string;

  constructor(
      name: string,
      type: Object,
      eTag: string,
      size: Number,
      tags: Array<string>,
      category: string,
      description: string,
      upload_date: Date,
      access: Array<Object>,
      additional_info?: Object,
      content?: string,
      from?: Date,
      thumbnail_etag?: string
  ) {
    this.name = name;
    this.type = type;
    this.eTag = eTag;
    this.size = size;
    this.tags = tags;
    this.category = category;
    this.description = description;
    this.upload_date = upload_date;
    this.access = access;
    this.additional_info = (additional_info) ? additional_info : "";
    this.content = (content) ? content : "";
    this.from = (from) ? from : new Date(Date.now());
    this.thumbnail_etag = (thumbnail_etag) ? thumbnail_etag : "";
  }
}

export interface IUser {
  email: string, //Primary Identifier
  password: string, //sha512 encoded
  registration_date: Number,
  permissions: Number,
  nickname?: string
}

export class User implements IUser {
  email: string;
  password: string;
  permissions: Number;
  registration_date: Number;
  nickname?: string;

  constructor(email: string, password: string, permissions: Number, registration_date: Number, nickname: string) {
    this.email = email;
    this.password = password;
    this.permissions = permissions;
    this.registration_date = registration_date;
    this.nickname = nickname;
  }
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
 * @param list A string Array containing one or multiple permissions.
 */
export function getPermissions(list: Array<string>) {
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