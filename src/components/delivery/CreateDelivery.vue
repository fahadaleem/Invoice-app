<template>
  <div class="c-create-delivery">
    <div class="header py-4">
      <h2 class="text-3xl font-bold text-center">Create Delivery</h2>
    </div>
    <!-- select customer -->
    <div>
      <div class="flex items-center">
        <h2 class="font-medium mr-4">Customer:</h2>
        <div>
          <select class="border-2 p-2 w-80 rounded-lg" v-model="customer">
            <option value="">Select customer</option>
            <option
              :value="customer._id"
              v-for="customer in listOfCustomers"
              :key="customer.email"
            >
              {{ customer.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- product table -->
    <c-delivery-products-table
      :customer="customer"
      @onSaveDeliveryNote="onSaveDeliveryNote"
    ></c-delivery-products-table>
  </div>
</template>

<script>
import DeliveryProductsTable from "./DeliveryProductsTable.vue";

// services
import { apiUtilsService } from "../../services/apiUtilsService";

export default {
  name: "c-create-delivery",
  components: {
    cDeliveryProductsTable: DeliveryProductsTable,
  },
  created() {
    const self = this;
    self.initialize();
  },
  data() {
    return {
      listOfCustomers: [],
      customer: "",
    };
  },
  methods: {
    initialize() {
      const self = this;
      self.getCustomersList();
    },
    getCustomersList() {
      const self = this;
      apiUtilsService
        .getCustomers()
        .then((resp) => {
          if (resp.status === "success") {
            self.listOfCustomers = resp.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSaveDeliveryNote({ deliveryDetails }) {
      const self = this;

      const products = deliveryDetails.products.map((product) => {
        return {
          product_id: product._id,
          product_name: product.name,
          cost_price: product.costPrice,
          selling_price: product.sellingPrice,
          quantity: product.quantity,
          total_amount: product.quantity * product.sellingPrice,
        };
      });
      const payload = {
        generated_by: "Fahad Aleem",
        customer_id: self.customer,
        products,
        subtotal: deliveryDetails.subTotal,
        payment_status: "UNPAID",
      };

      apiUtilsService
        .createDeliveryNote(payload)
        .then((res) => console.log(res.data));
    },
  },
};
</script>
