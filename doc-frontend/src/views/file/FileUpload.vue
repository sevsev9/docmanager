<template>
  <div>
    <h1>Upload a File</h1>
    <div class="document-upload">
      <b-form id="file-upload" v-on:submit.prevent="uploadFile">
        <b-form-file
            v-model="file1"
            :state="Boolean(file1)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            @change="fileChange"
            required
        ></b-form-file>
        <b-form-group
            id="document-upload-metadata"
            label="Please add the metadata for the document as desired."
            v-if="file1 !== undefined"
        >
          <b-form-input type="text" v-model="meta.name" placeholder="File Name" required></b-form-input>
          <b-form-input type="text" v-model="meta.type" placeholder="File Type" required></b-form-input>
          <b-form-input type="text" v-model="meta.sizeFormatted" disabled placeholder="File Size"> Bytes</b-form-input>
          <b-form-tags input-id="tags" v-model="meta.tags" placeholder="Add Tags by pressing 'Enter'..." required></b-form-tags>
          <b-form-input type="text" placeholder="Category" v-model="meta.category" required></b-form-input>
          <!-- @Todo: add grant other user access -->
          <b-form-textarea type="text" placeholder="Description" v-model="meta.description" required></b-form-textarea>
          <b-form-input type="text" placeholder="Content" v-model="meta.content"></b-form-input>
          <b-form-input type="date" placeholder="The date which the document was issued (optional)." v-model="meta.from"></b-form-input>
          <b-button type="submit" :disabled="file1 === undefined">Upload</b-button>
        </b-form-group>
      </b-form>
    </div>

    <b-overlay no-wrap :show="show" rounded>
      <template #overlay>
        <div class="text-center p-4 bg-primary text-light rounded">
          <b-icon icon="cloud-upload" font-scale="4"></b-icon>
          <div class="mb-3">Processing...</div>
          <b-progress
              min="0"
              max="100"
              :value="counter"
              variant="success"
              height="3px"
              class="mx-n4 rounded-0"
          ></b-progress>
        </div>
        <div v-if="success">
          Successfully uploaded!
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
export default {
  name: "FileUpload",
  data: () => {
    return {
      file1: undefined,
      show: false,
      counter: 0,
      success: false,
      meta: {
        name: "",
        type: "",
        size: 0,
        sizeFormatted: "",
        tags: [],
        category: "",
        access: [],
        content: "",
        description: "",
        from: "",
        additional_info: "" //@Todo: for later use
      }
    }
  },
  methods: {
    uploadFile(e) {
      this.show = true;
      let fdata = new FormData();
      fdata.append('file', e.target[0].files[0]);
      fdata.append('metadata', JSON.stringify(this.meta));
      this.$store.dispatch('uploadFile', {
        formData: fdata,
        onProgress: this.uploadProgress,
        onComplete: this.onComplete
      });
    },
    uploadProgress(e) {
      this.counter = e.loaded / e.total * 100;
    },
    onComplete() {
      this.success = true;
      setTimeout(() => {
        this.show = false;
      }, 500)
    },
    fileChange(e) {
      console.log(e.target.files[0])
      this.meta.name = e.target.files[0].name
      this.meta.type = e.target.files[0].type
      this.meta.size = e.target.files[0].size //size in bytes
      this.meta.sizeFormatted = this.formatSize(e.target.files[0].size)
      this.meta.from = new Date(e.target.files[0].lastModified).toISOString().slice(0, 10)
    },
    formatSize(bytes, si=false, dp=1) {
      const thresh = si ? 1000 : 1024;

      if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
      }

      const units = si
          ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
          : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
      let u = -1;
      const r = 10**dp;

      do {
        bytes /= thresh;
        ++u;
      } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


      return bytes.toFixed(dp) + ' ' + units[u];
    }
  }
}
</script>

<style scoped>

.document-upload {
  width: 30%;
  margin: auto;
}

textarea {
  margin-bottom: 2%;
}

input {
  margin-bottom: 2%;
  margin-top: 2%;
}

</style>