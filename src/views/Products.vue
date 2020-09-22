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
            <img src="/images/svg/b.svg" alt class="img-fluid" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <h3 class="float-left">Products listing</h3>
            <button @click="addNew" class="btn btn-primary btn-sm float-right">
              Add Product
            </button>

            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in products" :key="index">
                  <td>{{ product.data().title }}</td>
                  <td>{{ product.data().price }}</td>
                  <td>
                    <button
                      @click="editProduct(product)"
                      data-toggle="modal"
                      data-target="#editProduct"
                      class="btn btn-primary m-2"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteProduct(product.id)"
                      class="btn btn-danger m-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editProduct"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit the Product</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form ref="anyName" @submit.prevent="saveData">
              <!-- main product -->
              <div class="row">
                <div class="col-md-8">
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Product Name"
                      v-model="product.name"
                      class="form-control"
                    />
                  </div>

                  <div class="form-group">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                  </div>
                </div>

                <!-- product sidebar -->
                <div class="col-md-4">
                  <h4 class="display-6">Details</h4>
                  <hr />

                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Product price"
                      class="form-control"
                    />
                  </div>

                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Product tags"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="product_image">Product Images</label>
                    <input type="file" class="form-control" />
                  </div>
                </div>
                <!-- footer  -->
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    @click="addProject"
                    data-dismiss="modal"
                    class="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase.js";

export default {
  name: "Products",
  data() {
    return {
      // getting data
      products: [],
      // saving data
      product: {
        title: null,
        price: null,
      },
      activeItem: null,
    };
  },
  // firestore() {
  //   return {
  //     products: fb.collection("products"),
  //   };
  // },
  methods: {
    // add new product
    addNew() {
      $("#editProduct").modal("show");
    },
    // realtime update the data
    watcher() {
      db.collection("products").onSnapshot((querySnapshot) => {
        this.products = [];
        querySnapshot.forEach((doc) => {
          this.products.push(doc);
        });
      });
    },
    updateProduct() {
      db.collection("products")
        .doc(this.activeItem)
        .update(this.product)
        .then(() => {
          this.watcher();
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    editProduct(product) {
      this.product = product.data();
      this.activeItem = product.id; // for update the item getting id of the product
    },
    deleteProduct(doc) {
      if (confirm("Are you sure?")) {
        db.collection("products")
          .doc("doc")
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      } else {
        console.log("Sorry! it is not dletee");
      }
    },
    getProducts() {
      db.collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            this.products.push(doc);
          });
        });
    },
    created() {
      this.getProducts();
    },
    async addProject() {
      try {
        await db.collection("products").add(this.product);
        this.$refs.anyName.reset(); // reseting the fields
        this.getProducts();
        console.log("Data is added");
      } catch (error) {
        console.log("Data could not add", error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
