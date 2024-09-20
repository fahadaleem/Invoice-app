import { createApp } from "vue";
import { router } from "./router";
import VueHtmlToPaper from "vue-html-to-paper";
import "./style.css";

// Components
import App from "./App.vue";

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],
};

createApp(App).use(VueHtmlToPaper, options).use(router).mount("#app");
