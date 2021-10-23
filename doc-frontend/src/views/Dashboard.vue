<template>
  <div style="width: 100%; height: available">
    <Sidebar></Sidebar>
    <router-view class="dashboard-router-view" name="fileview"></router-view>
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
.dashboard-router-view {
  width: 100%;
  height: 100vh;
}
</style>