<template>
  <div class="checkout">
    <Navbar />
    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-md-8">
          <h4 class="py-4">Checkout page</h4>
          <ul>
            <li
              v-for="(item, index) in this.$store.state.cart"
              :key="index"
              class="media"
            >
              <img
                :src="item.productImage"
                width="80px"
                class="align-self-center"
              />
              <div class="media-body">
                <h5 class="mt-0">
                  {{ item.productName }}
                  <span
                    class="float-right cross"
                    @click="$store.commit('removeFromCart', item)"
                    >X</span
                  >
                </h5>
                <p class="mt-0">{{ item.productPrice | currency }}</p>
                <p class="mt-0">Quantity: {{ item.productQuantity }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5 class="py-4">Total Price</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.cross {
  cursor: pointer;
}
</style>