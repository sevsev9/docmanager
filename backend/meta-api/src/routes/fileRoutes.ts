import {Request, Response} from "express";
import Router from "express";
import {DocumentModel} from "../database/dbSchemas";
import {checkDocument, createDocument} from "../protocol/Checks";
import multer from "multer";
import {metaUnique} from "../helper/dbUtil";
import axios from "axios";
import FormData from "form-data";

let upload = multer({storage: multer.memoryStorage()});

const router = Router();

router.post('/upload', upload.any(), (req: Request, res: Response) => {
    // @ts-ignore
    if (req.session.user) {
        if (req.body.metadata) {    //@Todo check if session is present in production and user still has space for the file to be uploaded
            if (req.files) {
                // Create class containing the metadata
                let meta = JSON.parse(req.body.metadata);
                // @ts-ignore
                meta.owner = req.session.user._id;
                let doc = createDocument(meta);
                console.log(doc);

                metaUnique(doc).then(unique => {    //@Todo replacement dialogue on frontend
                    if (unique) { //proceed with upload
                        let fd = new FormData();
                        // @ts-ignore
                        fd.append('file', req.files[0].buffer, doc.owner + "_" + req.files[0].originalname);
                        fd.append('uid', doc.owner);
                        axios.post(process.env.FILE_UPLOAD_URL!, fd, { headers: fd.getHeaders(), maxBodyLength: Infinity, maxContentLength: Infinity})
                            .then(_res => {
                                if (_res.status === 200) { // file upload was successful
                                    // Create new Database entry of file
                                    doc.etag = _res.data.eTag    // Set eTag for file identification and downloading.

                                    new DocumentModel(doc).save().then(r => {
                                        res.status(200);
                                        res.send("Successfully uploaded given file");
                                        console.log(`[Meta-Upload] Saved new document in database - name: ${r.name} etag: ${r.etag}`);
                                    });
                                }
                            })
                            .catch(err => {
                                res.status(500);
                                res.send(err);
                                res.end();
                            });
                    } else {
                        res.status(409);
                        res.send("Document with that name already exists in the database.");
                        res.end();
                    }
                });
            }
            // check if metadata document would be unique
            // send upload to file upload service
            // upon upload completion insert metadata document
            // Optional: Log upload
            // return success to client
        }
    } else {
        res.status(401);
        res.send({
            err: true,
            msg: "User not logged in."
        })
    }
});

router.post('/download', (req: Request, res: Response) => {
    if (req.body.metadata) {
        //Metadata Verification/checks
        //Request Download Link from File Download Service (DNS: file.download.internal)
        //Forward pre-signed (GET) link to frontend
        //Log download
    } else {
        res.status(401);
        res.send({
            error: true,
            msg: "Malformed request: Body missing!"
        });
    }

    res.end();
});

router.post('/bulk/download', (req: Request, res: Response) => {
    if (req.body.list) {
        // check if all files in list exist (identification via eTag or name)
        // Request download URLs from file download service(s) (DNS: file.download.internal)
        // Forward download links in list
        // Log activity
    } else {
        res.status(401);
        res.send({
            error: true,
            msg: "Malformed request: Body missing!"
        });
    }
});


router.post('/file/bulk/upload', async (req: Request, res: Response) => {
    if (req.body.list) {
        const documents = [];
        for (const elem in req.body.list) {
            if (checkDocument(elem)) {
                const doc = new DocumentModel(createDocument(elem));
                documents.push(doc);
            } else {
                res.status(400);
                res.send({
                    error: true,
                    msg: "Documents have to conform with the document-metadata model.",
                    data: elem
                });
                res.end();
            }
        }

        for (const e of documents) {
            await e.save();
        }
        // Metadata Verification/checks
        // Create thumbnail
        // Request upload URLs from file download service(s) (DNS: file.upload.internal)
        // Forward upload links in list
        // Log activity
    } else {
        res.status(401);
        res.send({
            error: true,
            msg: "Malformed request: Body missing!"
        });
    }
});

/**
 * Returns a list of file metadata for a user
 */
router.get('/file/list:uid', (req: Request, res: Response) => {
    DocumentModel.find({$in: {"access.uid": req.params.uid!}}, {"_id": false,}, undefined, (err, data) => {
        if (err) {
            res.status(500);
            res.send({
                err: true,
                msg: err.toString()
            });
        } else {
            res.status(200);
            res.send({
                err: false,
                data: {
                    documents: [...data]
                }
            })
        }
        res.end();
    });
});

export default router;