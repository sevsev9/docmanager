import express, {Application, Request, Response, NextFunction} from "express";
import {Client} from "minio";
import Multer from "multer";
const MulterMinIO = require("multer-minio-storage-engine");
import bodyParser from "body-parser";

require('dotenv').config({ path: __dirname+"/../.env"});

const app:Application = express();
app.use(bodyParser.json({limit: "4mb"}));

const minioClient:Client = new Client({
    endPoint: process.env.MINIO_ENDPOINT!,
    port: parseInt((process.env.MINIO_PORT) ? process.env.MINIO_PORT : "9000", 10),
    useSSL: (process.env.MINIO_SECURE === 'true'),
    accessKey: process.env.MINIO_ACCESSKEY!,
    secretKey: process.env.MINIO_SECRETKEY!
});

const upload = Multer({
    storage: MulterMinIO({
        // @ts-ignore
        minio: minioClient,
        bucketName: process.env.MINIO_BUCKET!,
        metaData: function (req:any, file:any, cb:Function) {
            cb(null, {fieldName: file.fieldname});
        },
        objectName: function (req:any, file:any, cb:Function) {
            cb(null, ""+file.originalname);
        }
    })
});

app.post("/uploadfile", upload.array("upload", 3), function (req, res) {
    // @ts-ignore
    res.send("Successfully uploaded " +req.files.length + " files!");
});

app.get('/presigned/*', (req, res) => {
    minioClient.presignedUrl(
        (req.originalUrl.includes("upload")) ? "POST" : "GET", process.env.MINIO_BUCKET!,
        (req.body.for_file) ? `${req.body.for_file}-icon.${req.body.extension}` : req.body.filename,
        10*60,
        (err, presignedUrl) => {
            if (err) {
                res.status(500);
                res.send({
                    error: true,
                    msg: err.toString()
                });
            } else {
                res.status(200);
                res.send({
                    error: false,
                    data: presignedUrl
                });
            }
            res.end();
    })
});

minioClient.bucketExists(process.env.MINIO_BUCKET!, function (error: any, exists: boolean) {
    if (error) {
        return console.log(error);
    } else if(exists){
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } else {
        return console.log(`Bucket "${process.env.MINIO_BUCKET}" doesn't exist! Please change the configuration or create the bucket.`);
    }
});
