import express, {Application, Request, Response, NextFunction} from "express";
import {Client} from "minio";
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

app.get("/download", function (request: Request, response: Response) {
    // @ts-ignore
    minioClient.getObject(process.env.MINIO_BUCKET, request.query.filename, function (error, stream) {
        if (error) {
            return response.status(500).send(error);
        }
        stream.pipe(response);
    });
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
