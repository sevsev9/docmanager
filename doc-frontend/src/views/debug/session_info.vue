<template>
  <div>
    <h1>Session Info</h1>
    <p id="info-print"></p>
  </div>
</template>

<script>
export default {
  name: "session_info",
  mounted() {
    this.$axios.get('http://localhost:8000/sess').then(res => {
      document.getElementById('info-print').innerText = JSON.stringify(res.data)
      console.log(res.data)
    }).catch(console.error)
  }
}
</script>

<style scoped>

</style>