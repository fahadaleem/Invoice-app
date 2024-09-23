<template>
  <div class="flex gap-4 w-full flex-wrap justify-content-center p-8">
    <div class="bg-slate-400 flex-1 p-12">
      <div class="flex justify-between gap-4">
        <button class="bg-slate-200 w-full px-8 py-4 rounded-md font-medium">
          Income
        </button>
        <button class="bg-slate-200 w-full px-8 py-4 rounded-md font-medium">
          Expense
        </button>
      </div>
      <div class="my-4">
        <button class="bg-slate-200 w-full px-8 py-4 rounded-md font-medium">
          Customer Database
        </button>
      </div>
      <div class="my-4">
        <button class="bg-slate-200 w-full px-8 py-4 rounded-md font-medium">
          Account Statement
        </button>
      </div>
    </div>
    <div class="bg-slate-400 flex-1 p-12">
      <div class="mb-4">
        <router-link
          to="/stock-purchase"
          class="bg-slate-200 w-full px-8 py-4 rounded-md font-medium text-center w-full block"
        >
          New Stock Purchase
        </router-link>
      </div>
      <div class="flex justify-between gap-4">
        <router-link
          to="/create-delivery"
          class="bg-slate-200 w-full px-8 py-4 rounded-md font-medium text-center"
        >
          Create Delivery
        </router-link>
        <button class="bg-slate-200 w-full px-8 py-4 rounded-md font-medium">
          Create Invoice
        </button>
      </div>
      <div class="my-4">
        <button class="bg-slate-200 w-full px-8 py-4 rounded-md font-medium">
          Register Expense
        </button>
      </div>
    </div>
    <div class="bg-slate-400 w-full p-12">
      <div class="flex justify-between gap-4">
        <button class="bg-slate-200 w-full px-8 py-4 rounded-md font-medium">
          Inventory
        </button>
        <button class="bg-slate-200 w-full px-8 py-4 rounded-md font-medium">
          Generate Report
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "c-dashboard",
};
</script>

<style scoped></style>
