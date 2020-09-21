<template>
  <div class="products">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
              ducimus.
            </p>
          </div>
          <div class="col-md-6">
            <img src="/images/svg/b.svg" alt="" class="img-fluid" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-8">
            <h3>Add your Products</h3>
            
            <form ref="anyName" @submit.prevent="saveData">
              <div class="form-group">
                <input
                  type="text"
                  v-model="product.title"
                  class="form-control"
                  placeholder="Title"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  v-model="product.price"
                  class="form-control"
                  placeholder="Price"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Add Product
              </button>
            </form>
            <hr>
            <div class="row">
              <div class="col-md-12">
                <h3>Products listing</h3>
                <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase.js";

export default {
  name: "Products",
  props: {
    msg: String
  },
  data() {
    return {
      // getting data
      products: {},
      // saving data
      product: {
        title: null,
        price: null
      }
    };
  },
  methods: {
    async saveData() {
      try {
        await db.collection("products").add(this.product);
        this.$refs.anyName.reset();// reseting the fields
        console.log("Data is added");
      } catch (error) {
        console.log("Data could not add", error);
      }
    },
    created(){
      console.log("CReating");
      db.collection("products").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
          });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
