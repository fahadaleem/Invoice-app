<template>
  <div class="c-delivery-note-view">
    <c-delivery-note></c-delivery-note>
  </div>
</template>
<script>
import DeliveryNote from "../components/delivery/DeliveryNote.vue";

export default {
  name: "c-delivery-note-view",
  components: {
    cDeliveryNote: DeliveryNote,
  },
};
</script>
