<template>
  <div class="login">
    <!-- Modal -->
    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <ul
              class="nav nav-fill nav-pills mb-3"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-login"
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected="true"
                  >Login</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-register-tab"
                  data-toggle="pill"
                  href="#pills-register"
                  role="tab"
                  aria-controls="pills-register"
                  aria-selected="false"
                  >Signup</a
                >
              </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="pills-login-tab"
              >
                <h5 class="text-center">Login Please</h5>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    v-model="email"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    v-model="password"
                    @keyup.enter="login"
                  />
                </div>
                <div class="form-group">
                  <button
                    class="btn btn-primary"
                    data-dismiss="modal"
                    @click="login"
                  >
                    Login
                  </button>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="pills-register-tab"
              >
                <h5 class="text-center">Create New Account</h5>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Name"
                    v-model="name"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    v-model="email"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="password"
                    @keyup.enter="register"
                  />
                </div>

                <div class="form-group">
                  <button
                    class="btn btn-primary"
                    data-dismiss="modal"
                    @click="register"
                  >
                    Signup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase.js";
export default {
  name: "Login",
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async login() {
      try {
        await fb.auth().signInWithEmailAndPassword(this.email, this.password);
        $("#login").modal("hide");
        this.$router.replace("/admin");
      } catch (error) {
        console.log("You can not register", error);
      }
    },
    async register() {
      try {
        const user = await fb
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        // saving user's name in the database
        db.collection("profiles")
          .doc(user.user.uid)
          .set({
            name: this.name,
          })
          .then(function() {
            // successfull notification
            Toast.fire({
              icon: "info",
              title: "Welcome to our app",
            });
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
        $("#login").modal("hide");
        this.$router.replace("/admin");
      } catch (error) {
        console.log("You can not register", error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
