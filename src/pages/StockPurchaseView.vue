<template>
  <div class="c-stock-purchase-view">
    <c-stock-purchase-form></c-stock-purchase-form>
  </div>
</template>
<script>
import StockPurchaseForm from "../components/stocks/StockPurchaseForm.vue";

export default {
  name: "c-stock-purchase-view",
  components: {
    cStockPurchaseForm: StockPurchaseForm,
  },
};
</script>
