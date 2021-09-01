docker run -d --name mongo \
 -e MONGO_INITDB_ROOT_USERNAME=root \
 -e MONGO_INITDB_ROOT_PASSWORD=Hello123World \
 -p 8081:8081 \
 -p 27017:27017 \
 -v /opt/data/mongodb/:/data/db \
 mongo