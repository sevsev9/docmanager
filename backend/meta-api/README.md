# meta-api

This api provides the structure and business logic of the backend.

Responsible for:
 - Mapping meta-data to uploaded files
 - Retrieving files
 - Managing pre-signed URLs

## Data Types

 - Document:
   - _id: String :> MongoDB ObjectID
   - name: String :> Document Name without extension
   - type: Object
     - type: String :> Type contains the image type
       - e.g.: "image", "document", ...
     - extension: String :> File extension without the "."
       - e.g.: ".png", ".pdf", ".docx", ...
   - eTag: String :> The file eTag under which it is accessible in the minio instance (on upload will be empty)
   - tags: Array<String> :> Tags set by the user.
     - (idea for free version) user is limited to 5 tags per document
   - content: String :> Some content which is in the file
     - Will be used for file previews later on.
     - Can be formatted in html.
   - access: Array<Object>
     - user: String :> User object id
     - role: Integer :> Bitset specifying the role the user has on the document
       - As described in dbTypes.js or in (Role Bitset)[#rolebitset]
   - from: Date/String :> JavaScript Date stored in MongoDB as String
     - Set by the user or the AI following deeper the development.
     - Date the document was received by the usre
   - created: Date/String :> JavaScript Date stored in MongoDB as String
     - Date when the document was uploaded.
   - category: The document category
     - e.g.: "receipt", "contract", ...
     - User sided categories will be calculated based on the documents the user has access to.
   - 
 

 - Bulk Upload:
   - list: `Array of Documents`

 - Bulk Download:
   - list: `Array of Document Names / eTags`
   - type: `eTag/Name` or `true/false`

## Responses
 
 - Packet
   - Default response object
   - error: `true/false`
   - msg: `optional: String`
   - data: `optional: any`