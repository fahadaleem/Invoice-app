<template>
  <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-semibold mb-6 text-gray-800">
      New Stock Purchase
    </h1>

    <!-- Radio Buttons for Bundle Selection -->
    <div class="mb-4">
      <label class="mr-6">
        <input type="radio" v-model="isBundle" :value="true" class="mr-2" />
        <span class="text-gray-700">Bundle</span>
      </label>
      <label>
        <input type="radio" v-model="isBundle" :value="false" class="mr-2" />
        <span class="text-gray-700">Not a Bundle</span>
      </label>
    </div>

    <!-- Date of Purchase -->
    <div class="mb-4">
      <label for="purchaseDate" class="block text-gray-700"
        >Date of Purchase:</label
      >
      <input
        type="date"
        v-model="form.purchaseDate"
        id="purchaseDate"
        class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <!-- Payment Method Dropdown -->
    <div class="mb-4">
      <label for="paymentMethod" class="block text-gray-700"
        >Payment Method:</label
      >
      <select
        v-model="form.paymentMethod"
        id="paymentMethod"
        class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="Bank Transfer">Bank Transfer</option>
      </select>
    </div>

    <!-- Total Bundle Cost (Visible only if Bundle is selected) -->
    <div v-if="isBundle" class="mb-4">
      <label for="totalBundleCost" class="block text-gray-700"
        >Total Bundle Cost:</label
      >
      <input
        type="number"
        v-model="form.totalBundleCost"
        id="totalBundleCost"
        class="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <!-- Item Table with Add/Delete Row Buttons -->
    <div class="mb-4">
      <h2 class="text-lg font-semibold mb-2 text-gray-800">Items</h2>
      <div class="grid grid-cols-5 gap-4 p-4 bg-gray-100 rounded-lg">
        <div class="text-gray-600 font-semibold">Quantity</div>
        <div class="text-gray-600 font-semibold">Item Name</div>
        <div class="text-gray-600 font-semibold">Min Market Value</div>
        <div v-if="isBundle" class="text-gray-600 font-semibold">
          Estimate Cost Price
        </div>
        <div v-else class="text-gray-600 font-semibold">Cost Per Unit</div>

        <!-- Loop through items -->
        <div
          v-for="(item, index) in form.items"
          :key="index"
          class="col-span-5 grid grid-cols-5 gap-4 items-center mt-2"
        >
          <div>
            <input
              type="number"
              v-model="item.quantity"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              v-model="item.itemName"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="number"
              v-model="item.minMarketValue"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div v-if="isBundle">
            <input
              type="number"
              v-model="item.estimateCostPrice"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div v-else>
            <input
              type="number"
              v-model="item.costPerUnit"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <!-- Delete Row Button -->
          <button
            @click="removeItem(index)"
            class="text-red-600 hover:text-red-800 transition"
          >
            <i class="fa fa-trash"></i>
          </button>
        </div>

        <!-- Add New Row Button -->
        <button
          @click="addItem"
          class="mt-4 text-blue-600 hover:text-blue-800 transition"
        >
          <i class="fas fa-plus"></i> Add Item
        </button>
      </div>
    </div>

    <!-- Submit Button -->
    <button
      @click="submitForm"
      class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
    >
      Submit Purchase
    </button>
  </div>
</template>

<script>
import { apiUtilsService } from "../../services/apiUtilsService";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      isBundle: false, // Track if it's a bundle or not
      form: {
        purchaseDate: "",
        paymentMethod: "",
        totalBundleCost: null,
        items: [
          {
            quantity: null,
            itemName: "",
            minMarketValue: null,
            estimateCostPrice: null,
            costPerUnit: null,
          },
        ],
      },
    };
  },
  methods: {
    addItem() {
      // Add a new row for the item
      this.form.items.push({
        quantity: null,
        itemName: "",
        minMarketValue: null,
        estimateCostPrice: null,
        costPerUnit: null,
      });
    },
    removeItem(index) {
      // Remove item by index
      this.form.items.splice(index, 1);
    },
    submitForm() {
      const self = this;
      // Format payload for API
      const payload = {
        purchaseDate: self.form.purchaseDate,
        paymentMethod: self.form.paymentMethod,
        isBundle: self.isBundle,
        supportingDocument: self.supportingDocument, // Ensure you have a field for this
        items: self.form.items.map((item) => {
          return {
            quantity: item.quantity,
            itemName: item.itemName,
            minMarketValue: item.minMarketValue,
            // Include estimateCostPrice if it's a bundle
            ...(self.isBundle
              ? { estimateCostPrice: item.estimateCostPrice }
              : { costPerUnit: item.costPerUnit }),
          };
        }),
        totalBundleCost: self.isBundle ? self.form.totalBundleCost : undefined, // Only include for bundle
      };

      apiUtilsService.createStockPurchase(payload).then((res) => {
        if (res.status === "success") {
          Swal.fire({
            title: "Success!",
            text: res.message,
            icon: "success",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
/* Minimal styling added here */
</style>
