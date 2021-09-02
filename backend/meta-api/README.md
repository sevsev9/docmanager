# meta-api

This api provides the structure and business logic of the backend.

Responsible for:
 - Mapping meta-data to uploaded files
 - Retrieving files
 - Managing pre-signed URLs

## Data Types

 - Document:
   - name: `String`
   - tags: `Array of Strings`
   - content: `String`
   - category: `String`
   - description: `String`
   - upload_date: `Date() or jsDate parsable String`
   - thumbnail_etag: `minio eTag`
   - from: `optional: Date() or jsDate parsable String`
 

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