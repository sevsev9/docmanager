docker run \
-d \
-p 9000:9000 \
-p 9001:9001 \
-e MINIO_ROOT_USER=doc_access \
-e MINIO_ROOT_PASSWORD=Change2Me! \
-v /home/"$USER"/minio/:/data \
--name minio \
minio/minio server /data --console-address ":9001"