<template>
  <div>
    <b-button v-b-toggle.dashboard-sidebar style="position: absolute; top: 2em; left: 2em">Toggle Sidebar</b-button>
    <b-sidebar id="dashboard-sidebar" title="Sidebar" shadow bg-variant="dark" text-variant="light">
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style scoped>

</style>