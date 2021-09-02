import {Request, Response, NextFunction} from "express";
import {app} from "../index";
import {DocumentModel, UserModel} from "../database/dbSchemas";

app.get("/", (req: Request, res: Response) => {
    res.status(200);
    res.send({
        error: false,
        msg: "Hello from API!"
    });
    res.end();
});

app.post('/upload', (req: Request, res: Response) => {
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

app.post('/download', (req: Request, res: Response) => {
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

app.post('/bulk/download', (req: Request, res: Response) => {
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


app.post('/bulk/upload', (req: Request, res: Response) => {
    if (req.body.list) {
        // Metadata Verification/checks
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
})