import express, {Application, Request, Response, NextFunction} from "express";
import {BucketItem, Client} from "minio";
import {CopyConditions} from "minio";
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

app.get('/list', (req: Request, res: Response) => {
    const list: Array<BucketItem> = [];
    let stream = minioClient.extensions.listObjectsV2WithMetadata(process.env.MINIO_BUCKET!, '', true, '');
    stream.on('data', function (obj: BucketItem) {
        list.push(obj);
    });
    stream.on('err', function (err: any) {
        console.log(err);
        res.status(500);
        res.send(err);
        res.end();
    });
    stream.on('end', () => {
        res.status(200);
        let str: String = JSON.stringify(list);
        res.send(str);
        res.end();
    });
});

app.get('/delete', (req: Request, res: Response) => {
    if (req.query.filename && typeof req.query.filename === "string") {
        minioClient.removeObject(process.env.MINIO_BUCKET!, req.query.filename, function(err) {
            if (err) {
                return console.log('Unable to remove object', err)
            }
            console.log('Removed the object')
        });
    } else {
        res.status(400);
        res.send("Malformed request!");
    }

});

// copys the file with a new name and deletes the old one
app.get('/rename', (req: Request, res: Response) => {
    if (typeof req.query.filename === "string" && typeof req.query.newname === "string") {
        let filename = ""+req.query.filename;
        minioClient.copyObject(process.env.MINIO_BUCKET!, req.query.newname, req.query.filename, new CopyConditions(), function (e, data) {
            if (e) {
                return console.log(e);
            } else {
                minioClient.removeObject(process.env.MINIO_BUCKET!, filename, function(err) {
                    if (err) {
                        return console.log('Unable to remove object', err);
                    } else {
                        res.status(200);
                        res.send("Successfully copied the Object!");
                        res.end();
                    }
                });
            }
        })
    } else {
        res.status(400);
        res.send("Malformed request!");
        res.end();
    }

    res.status(500);
    res.send("An error occurred during processing. Please report this.");
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
