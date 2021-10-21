<template>
  <div>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "Dashboard",
  components: {
    Sidebar
  },
  mounted() {
    if (!this.$store.getters.loggedIn) {
      this.$router.push("/Login");
    }
  }
}
</script>

<style scoped>

</style>