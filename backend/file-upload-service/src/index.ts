import express, {Application, Request, Response, NextFunction} from "express";
import {Client} from "minio";
import Multer from "multer";
const MulterMinIO = require("multer-minio-storage-engine");

require('dotenv').config({ path: __dirname+"/../.env"});

const app:Application = express();
app.use(express.json({limit: "2gb"}));
app.use(express.urlencoded({limit: "2gb"}));
// Enable CORS
app.use(function(req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const minioClient:Client = new Client({
    endPoint: process.env.MINIO_ENDPOINT!,
    port: parseInt((process.env.MINIO_PORT) ? process.env.MINIO_PORT : "9000", 10),
    useSSL: (process.env.MINIO_SECURE === 'true'),
    accessKey: process.env.MINIO_ACCESSKEY!,
    secretKey: process.env.MINIO_SECRETKEY!
});

// const upload = Multer({
//     storage: MulterMinIO({
//         // @ts-ignore
//         minio: minioClient,
//         bucketName: process.env.MINIO_BUCKET!,
//         metaData: function (req:any, file:any, cb:Function) {
//             cb(null, {fieldName: file.fieldname});
//         },
//         objectName: function (req:any, file:any, cb:Function) {
//             cb(null, ""+file.originalname);
//         }
//     })
// });

function formatSize(bytes: number | undefined, si = false, dp = 1) {
    if (bytes) {


        const thresh = si ? 1000 : 1024;

        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }

        const units = si
            ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        let u = -1;
        const r = 10 ** dp;

        do {
            bytes /= thresh;
            ++u;
        } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


        return bytes.toFixed(dp) + ' ' + units[u];
    } else {
        return "-1 Bytes"
    }
}

app.post("/upload", Multer({storage: Multer.memoryStorage()}).single("file"), function(req, res) {
    if (req.file && req.body.uid) {
        minioClient.putObject(process.env.MINIO_BUCKET!, req.file.originalname, req.file.buffer, function(error, etag) {
            if(error) {
                console.log(error);
                res.status(500);
                res.send(error);
                res.end();
            }
            res.status(200);
            res.send({
                msg: "Successfully uploaded file!",
                eTag: etag.etag
            });
            res.end();
            console.log(`[Upload] Uploaded new file with name: '${req.file?.originalname}' and size: ${formatSize(req.file?.size)}`);
        })
    } else {
        res.status(400);
        res.send(`Request parameter mismatch. ${req.body.uid ? 'User ID' : ''} ${req.file ? 'File': ''} missing.`);
        res.end();
    }
});
//@TODO configure nginx ingress controller to change request headers according to (this)[https://stackoverflow.com/questions/64815229/nginx-controller-kubernetes-need-to-change-host-header-within-ingress] link.
// nginx-ingress controller required for presigned urls with docker image
app.get('/presigned/*', (req, res) => {
    /*minioClient.presignedUrl(
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
    })*/
    res.status(402)
    res.send("Not implemented yet.");
    res.end();
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
