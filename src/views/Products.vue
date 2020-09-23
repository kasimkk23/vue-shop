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
                  <td>{{ product.name }}</td>
                  <td>{{ product.price }}</td>
                  <td>
                    <button
                      data-toggle="modal"
                      class="btn btn-primary btn-sm"
                      @click="editProduct(product)"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteProduct(product)"
                      class="btn btn-danger btn-sm"
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
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLabel"
              v-if="modal == 'new'"
            >
              Add New Product
            </h5>
            <h5
              class="modal-title"
              id="exampleModalLabel"
              v-if="modal == 'edit'"
            >
              Edit The Product
            </h5>
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
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      v-model="product.descirption"
                    ></textarea>
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
                      v-model="product.price"
                    />
                  </div>

                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Product tags"
                      class="form-control"
                      v-model="product.tag"
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
                    data-dismiss="modal"
                    class="btn btn-primary"
                    @click="addProject"
                    v-if="modal == 'new'"
                  >
                    Add Product
                  </button>
                  <button
                    type="submit"
                    data-dismiss="modal"
                    class="btn btn-primary"
                    @click="updateProduct"
                    v-if="modal == 'edit'"
                  >
                    Update Product
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
import { db } from "../firebase.js";

export default {
  name: "Products",
  data() {
    return {
      // getting data
      products: [],
      // saving data
      product: {
        name: null,
        descirption: null,
        price: null,
        tag: null,
        image: null,
      },
      activeItem: null,
      modal: null,
    };
  },
  firestore() {
    return {
      products: db.collection("products"),
    };
  },
  methods: {
    // adding new product
    addProject() {
      this.$firestore.products.add(this.product);
      Toast.fire({
        icon: "success",
        title: "Product Added successfully",
      });
    },
    // openning the new product modal
    addNew() {
      this.modal = "new";
      $("#product").modal("show");
    },
    // editing the product
    editProduct(product) {
      this.modal = "edit";
      this.product = product;
      $("#product").modal("show");
    },
    // update the product
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      Toast.fire({
        icon: "success",
        title: "Product Updated Successfully",
      });
    },
    // delete the product
    deleteProduct(doc) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        this.$firestore.products.doc(doc[".key"]).delete();
        // successfull notification
        Toast.fire({
          icon: "success",
          title: "Deleted successfully",
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
