import { createRouter, createWebHistory } from "vue-router";

import HomeView from "./pages/HomeView.vue";
import DeliveryView from "./pages/DeliveryView.vue";
import DeliveryNote from "./pages/DeliveryNoteView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/create-delivery", component: DeliveryView },
  { path: "/delivery-note/:id", component: DeliveryNote },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
