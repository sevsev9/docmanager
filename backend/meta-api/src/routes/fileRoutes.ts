import {Request, Response} from "express";
import Router from "express";
import {DocumentModel} from "../database/dbSchemas";
import {checkDocument, createDocument} from "../protocol/Checks";
import axios from "axios";

const router = Router();


router.post('/upload', (req: Request, res: Response) => {
    // @ts-ignore
    res.redirect(307, process.env.FILE_UPLOAD_SERVICE_URL+"/upload");
    /*if (req.body.metadata) {
        if (req.body.metadata.icon) {   //is document
            //@TODO continue here
            axios.get(`${process.env.FILE_UPLOAD_SERVICE_URL}/upload`).then(resp => {
               res.status(200);
               res.send(resp);
            }).catch(err => {
                res.status(400);
                res.send(err);
            });
        } else { //is icon

        }
        //Metadata Verification/checks
        //Request Upload Link from File Upload Service
        //Forward pre-signed (PUT) link to frontend (DNS: file.upload.internal)
        //Upload Metadata to Database
        //Log Upload
    } else {
        res.status(400);
        res.send({
            error: true,
            msg: "Malformed request: Body missing!"
        });
    }*/
    res.status(200);
    res.end();
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
    DocumentModel.find({ $in: {"access.uid": req.params.uid!} } ,{"_id": false, }, undefined, (err, data) => {
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