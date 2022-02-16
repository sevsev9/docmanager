# docmanager
Document Management Software - Archive Your Documents

## Description
The aim of this application is to help people archive, sort, search and find analogue documents, receipts, etc.

## Tech Stack

### Frontend
  - VueJS
    - Axios (REST API Requests)
    - vue-google-auth (Google OAuth)
    - VueX Store (State Management)
    - Vue Router
    - BootstrapVue (Components)

### Backend
  - NodeJS
    - Typescript (Type Safety)
    - Express / +Session
    - mongoose (MongoDB)
    - minio self-hosted s3 buckets
## Default Port Maps
### Backend
- Meta API: 8000
- Upload Service: Port 8083
- Download Service: Port 8082
- Modify Service: Port 8083
- Minio: Port 9000
- Minio Console: Port 9001

### Frontend
- Web Interface: Port 8080
