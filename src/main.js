import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import Swal from "sweetalert2";
window.Swal = Swal;
import "popper.js";
import "bootstrap";
import "./assets/app.scss";
import { fb } from "./firebase.js";
import VueFirestore from "vue-firestore";

Vue.config.productionTip = false;
Vue.use(VueFirestore);

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

window.Toast = Toast;

Vue.component("Navbar", require("./components/Navbar.vue").default);
Vue.component("Hero", require("./components/Hero.vue").default);
Vue.component("Products", require("./sections/Products.vue").default);

let app = "";

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
