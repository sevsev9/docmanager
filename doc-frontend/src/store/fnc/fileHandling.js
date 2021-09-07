import axios from 'axios';

function configureUploadHook(cb) {
  return {
    onUploadProgress(progressEvent) {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      if (cb) cb(percentCompleted);
      return percentCompleted;
    }
  }
}

module.exports = {
  singleUpload(metadata, file, onProgress) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.SINGLE_UPLOAD_URL, metadata).then(res => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post(res.data.endpoint, formData, configureUploadHook(onProgress)).then(resolve).catch(reject);
      }).catch(err => reject(err));
    })
  },
  //contains a list of objects each containing metadata and file keys: { metadata: {...}, file: {...} }
  multipleUpload(list) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.MULTIPLE_FILE_UPLOAD, list.map(data => data.metadata)).then(res => {
        let total = [];
        let err = [];
        for (let i = 0; i < res.data.links.length; i++) {
          const fd = new FormData();
          fd.append(`file${i}`, list[i].file);
          axios.post(res.data.links[i], fd).then(total.append).catch(err.append);
        }
        if (err.length > 0) reject({total, err}); else
          resolve(total);
      })
    })
  },
  //contains File name and eTag
  singleDownload(file) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.SINGLE_FILE_DOWNLOAD+`?${ (file.etag) ? "etag="+file.etag : "name="+file.name}`, { responseType: 'blob' }).then(res => {
        const fileURL = window.URL.createObjectURL(new Blob([res.data]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', file.name);
        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.remove();
        resolve();
      }).catch(reject)
    })
  },
  //contains a list of config objects with either eTags or File names
  multipleDownload(list) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.MULTIPLE_FILE_DOWNLOAD, list).then(res => {
        resolve(res.data.list);
      }).catch(reject);
    })
  },
  modifyFile(config) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.FILE_MODIFY, config).then(resolve).catch(reject)
    })
  },
  deleteFile(config) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.DELETE_FILE, config).then(resolve).catch(reject);
    })
  }
}

//Configs look somewhat like the following:
//provided the user is logged in with a session (express-session) and the user (token) has the right to delete the file
// eslint-disable-next-line no-unused-vars
let default_config = {
  etag: "some etag", //or
  name: "some filename"
}