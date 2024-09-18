<template>
  <div class="c-delivery-product-table">
    <!-- Table Header -->
    <div
      class="hidden sm:flex justify-between bg-slate-700 p-6 my-2 text-slate-200"
    >
      <div class="w-1/6 text-center">S.No</div>
      <div class="w-1/6 text-center">Product</div>
      <div class="w-1/6 text-center">Cost Price</div>
      <div class="w-1/6 text-center">Selling Price</div>
      <div class="w-1/6 text-center">Quantity</div>
      <div class="w-1/6 text-center">Total Amount</div>
    </div>

    <!-- Table Content -->
    <div class="overflow-x-auto">
      <div
        class="flex justify-between bg-slate-700 p-6 my-2 text-slate-200 sm:hidden"
      >
        <div class="w-full text-center">Product Details</div>
      </div>

      <div
        class="flex sm:hidden justify-between bg-gray-100 p-4 my-2 border-b-2"
      >
        <!-- Mobile view for each row -->
        <div class="flex w-full justify-between">
          <div class="flex-col w-full">
            <p>S.No: 01</p>
            <p>
              Product:
              <select class="border-2 p-2 w-full rounded-lg">
                <option value="">Select customer</option>
                <option value="fahad">Fahad Aleem</option>
                <option value="another-user">Test User</option>
                <option value="hamza">Hamza</option>
              </select>
            </p>
            <p>Cost Price: 40dhs</p>
            <p>
              Selling Price:
              <input type="number" class="border-2 p-2 rounded-lg" />
            </p>
            <p>
              Quantity: <input type="number" class="border-2 p-2 rounded-lg" />
            </p>
            <p>Total Amount: 80dhs</p>
          </div>
        </div>
      </div>

      <!-- Table view for larger screens -->
      <div
        class="hidden sm:flex justify-between items-center p-6 border-b-2 gap-x-2"
        v-for="(row, index) in rows"
        :key="index"
      >
        <div class="w-1/6 text-center">{{ index + 1 }}</div>
        <div class="w-1/6">
          <select
            class="border-2 p-2 w-full rounded-lg"
            v-model="row._id"
            @change="(e) => onSelectProduct(e.target.value, index)"
          >
            <option value="">Select product</option>
            <option
              :value="product._id"
              v-for="product in listOfProducts"
              :key="product.name"
            >
              {{ product.name }}
            </option>
          </select>
        </div>
        <div class="w-1/6 text-center">{{ row.costPrice }} Dhs</div>
        <div class="w-1/6 text-center">
          <input
            type="number"
            class="border-2 p-2 rounded-lg w-full"
            v-model="row.sellingPrice"
            :disabled="!row._id"
          />
        </div>
        <div class="w-1/6 text-center">
          <input
            type="number"
            class="border-2 p-2 rounded-lg w-full"
            v-model="row.quantity"
            :disabled="!row._id"
          />
        </div>
        <div class="w-1/6 text-center">
          {{ row.sellingPrice * row.quantity }} Dhs
        </div>
      </div>
    </div>
    <!-- Subtotal Row -->
    <div class="flex justify-between bg-slate-700 p-6 my-2 text-slate-200">
      <div class="w-5/6 text-right font-bold">Subtotal:</div>
      <div class="w-1/6 text-center">{{ subtotal }} Dhs</div>
    </div>
    <!-- Add Row Button -->
    <div class="flex justify-center my-4 gap-x-2">
      <button
        @click="addRow"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Add New Row
      </button>
      <button
        @click="onSaveDeliveryNote"
        :disabled="isSaveBtnDisabled"
        class="bg-cyan-500 text-white px-4 py-2 rounded-lg"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { apiUtilsService } from "../../services/apiUtilsService";
export default {
  name: "c-delivery-product-table",
  props: {
    customer: {
      type: String,
    },
  },
  data() {
    return {
      listOfProducts: [],
      rows: [
        {
          name: "",
          costPrice: 0,
          sellingPrice: 0,
          quantity: 1,
          _id: "",
        },
      ],
    };
  },
  created() {
    const self = this;
    self.initialize();
  },
  computed: {
    subtotal() {
      return this.rows.reduce((acc, row) => {
        return acc + row.sellingPrice * row.quantity;
      }, 0);
    },
    isSaveBtnDisabled() {
      const self = this;

      // Check if any row has missing required fields
      return self.rows.some((row) => {
        // Disable save if any field (product, sellingPrice, quantity) is empty or invalid
        return (
          !row._id ||
          !row.sellingPrice ||
          !row.quantity ||
          row.quantity <= 0 ||
          !self.customer
        );
      });
    },
  },
  methods: {
    initialize() {
      const self = this;
      self.getProductsList();
    },
    getProductsList() {
      const self = this;
      apiUtilsService
        .getProducts()
        .then((resp) => {
          if (resp.status === "success") {
            self.listOfProducts = resp.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSelectProduct(productId, index) {
      const self = this;
      const product = self.listOfProducts.find(
        (product) => product._id === productId
      );

      if (product) {
        self.rows[index].costPrice = product.price;
        self.rows[index].name = product.name;
      }
    },
    addRow() {
      const self = this;
      // Add a new row with default values
      self.rows.push({
        name: "",
        costPrice: 0,
        sellingPrice: 0,
        quantity: 0,
        _id: "",
      });
    },
    onSaveDeliveryNote() {
      const self = this;
      self.$emit("onSaveDeliveryNote", {
        deliveryDetails: {
          products: self.rows,
          subTotal: self.subtotal,
        },
      });
    },
  },
};
</script>
