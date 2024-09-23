import axios from "axios";

export const apiUtilsService = (() => {
  function getCustomers() {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/customers`;
    return axios.get(url).then((res) => res.data);
  }

  function getProducts() {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/products`;
    return axios.get(url).then((res) => res.data);
  }

  function createDeliveryNote(payload) {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/delivery`;
    return axios.post(url, payload).then((res) => res.data);
  }

  function getDeliveryNoteDetails(id) {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/delivery/${id}`;
    return axios.get(url).then((res) => res.data);
  }

  function createStockPurchase(payload) {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/stock`;
    return axios.post(url, payload).then((res) => res.data);
  }

  return {
    getCustomers,
    getProducts,
    getDeliveryNoteDetails,
    createDeliveryNote,
    createStockPurchase,
  };
})();
