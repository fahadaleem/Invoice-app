<template>
  <div class="page">
    <c-create-delivery></c-create-delivery>
  </div>
</template>
<script>
import CreateDelivery from "../components/delivery/CreateDelivery.vue";

export default {
  name: "c-delivery-view",
  components: {
    cCreateDelivery: CreateDelivery,
  },
};
</script>
