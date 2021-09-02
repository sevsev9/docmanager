import {Request, Response, NextFunction} from "express";
import {app} from "../index";
import {DocumentModel, UserModel} from "../database/dbSchemas";
import {checkDocument, createDocument} from "../protocol/Checks";
import {Packet} from "../protocol/Packet";
import {create} from "domain";

app.post('/file/upload', (req: Request, res: Response) => {
    if (req.body.metadata) {
        //Metadata Verification/checks
        //Request Upload Link from File Upload Service
        //Forward pre-signed (PUT) link to frontend (DNS: file.upload.internal)
        //Upload Metadata to Database
        //Log Upload
    } else {
        res.status(401);
        res.send({
            error: true,
            msg: "Malformed request: Body missing!"
        });
    }

    res.end();
});

app.post('/file/download', (req: Request, res: Response) => {
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

app.post('/file/bulk/download', (req: Request, res: Response) => {
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


app.post('/file/bulk/upload', async (req: Request, res: Response) => {
    if (req.body) {
        const documents = [];
        for (let elem in req.body.list) {
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
 * Returns a list of file metadata
 */
app.get('/file/list', (req: Request, res: Response) => {
    DocumentModel.find({"_id": false}, (err, data) => {
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