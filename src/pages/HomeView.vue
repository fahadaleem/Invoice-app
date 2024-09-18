<template>
  <c-dashboard></c-dashboard>
</template>

<script>
import Dashboard from "../components/dashboard/Dashboard.vue";

export default {
  name: "c-home-view",
  components: {
    cDashboard: Dashboard,
  },
};
</script>
