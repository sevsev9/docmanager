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
            required
        ></b-form-file>
        <b-form-group
            id="document-upload-metadata"
            label="Please add the metadata for the document as desired."
        >

        </b-form-group>
        <b-button type="submit">Upload</b-button>
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
      success: false
    }
  },
  methods: {
    uploadFile(e) {
      this.show = true;
      let fdata = new FormData();
      fdata.append('file', e.target[0].files[0]);
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
    }
  }
}
</script>

<style scoped>

.document-upload {
  width: 30%;
  margin: auto;
}

</style>