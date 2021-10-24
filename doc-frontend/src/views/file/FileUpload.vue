<template>
  <div>
    <h1>Upload a File</h1>
    <div class="document-upload">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "FileUpload",
  data: () => {
    return {
      file1: undefined
    }
  },
  methods: {}
}
</script>

<style scoped>

.document-upload {
  width: 30%;
  margin: auto;
}

</style>