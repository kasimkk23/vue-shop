import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, item) {
      let found = state.cart.find((p) => p.productId === item.productId);
      found ? found.productQuantity++ : state.cart.push(item);
    },
  },
});
