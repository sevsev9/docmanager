<template>
  <div>
    <b-button v-b-toggle.dashboard-sidebar style="position: absolute; top: 0.7em; left: 0.7em">
      <b-icon icon="layout-sidebar" v-if="!sidebar_state"></b-icon>
      <b-icon icon="layout-sidebar-inset" v-else></b-icon>
    </b-button>
    <b-sidebar id="dashboard-sidebar" title="Sidebar" shadow bg-variant="dark" text-variant="light"
               v-model="sidebar_state">
      <div class="px-3 py-2">
        <div class="button-head">
          <b-button :variant="dashboardVariantGetter" @click="$router.push('/file/stats')">Dashboard</b-button>
          <b-button :variant="listVariantGetter" @click="$router.push('/file/list')">File List</b-button>
          <b-button :variant="tableVariantGetter" @click="$router.push('/file/table')">File Table</b-button>
          <b-button :variant="uploadVariantGetter" @click="$router.push('/file/upload')">File Upload</b-button>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data: () => {
    return {
      sidebar_state: false,
    }
  },
  methods: {

  },
  computed: {
    dashboardVariantGetter() {
      return (this.$store.getters.getRoute === "stats") ? "success" : "outline-primary" ;
    },
    listVariantGetter() {
      return (this.$store.getters.getRoute === "list") ? "success" : "outline-primary" ;
    },
    tableVariantGetter() {
      return (this.$store.getters.getRoute === "table") ? "success" : "outline-primary" ;
    },
    uploadVariantGetter() {
      return (this.$store.getters.getRoute === "upload") ? "success" : "outline-primary" ;
    }
  },
  mounted() {
    this.$store.commit('setDashboardRoute', 'stats')
  }
}
</script>

<style scoped>
.button-head {
  height: 40vh;
}

.button-head > button {
  width: 100%;
  margin-top: 2em;
}

.button-head > button > a {
  color: white;
  text-decoration: none;
}
</style>