<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <a href="#">pro sidebar</a>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header d-flex flex-nowrap">
            <div class="user-pic">
              <img
                class="img-responsive img-rounded"
                src="/images/user.jpg"
                alt="User picture"
              />
            </div>
            <div class="user-info">
              <span class="user-name">{{ name }} </span>
              <span class="user-role">{{ email }}</span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <!-- sidebar-search  -->
          <div class="sidebar-item sidebar-search">
            <div>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control search-menu"
                  placeholder="Search..."
                />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- sidebar-menu  -->
          <div class=" sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Menu</span>
              </li>
              <li class="sidebar-dropdown">
                <router-link to="/admin/overview">
                  <i class="fa fa-tachometer-alt"></i>
                  <span class="menu-text">Overview</span>
                </router-link>
              </li>
              <li class="sidebar-dropdown">
                <router-link to="/admin/products">
                  <i class="fas fa-archive"></i>
                  <span class="menu-text">Products</span>
                </router-link>
              </li>
              <li class="sidebar-dropdown">
                <router-link to="/admin/profile">
                  <i class="fas fa-user"></i>
                  <span class="menu-text">Profile</span>
                </router-link>
              </li>
              <li class="sidebar-dropdown">
                <router-link to="/admin/orders">
                  <i class="fa fa-shopping-cart"></i>
                  <span class="menu-text">Orders</span>
                </router-link>
              </li>
              <li class="sidebar-dropdown">
                <a href="#" @click="logout">
                  <i class="fas fa-toggle-on"></i>
                  <span class="menu-text">Logout</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
        <!-- sidebar-footer  -->
      </nav>
      <!-- page-content  -->
      <main class="page-content">
        <router-view />
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
// @ is an alias to /src
// import Hero from "@/components/Hero.vue";
import { fb, db } from "../firebase.js";

export default {
  name: "Admin",
  data() {
    return {
      name: null,
      email: null,
    };
  },
  methods: {
    logout() {
      try {
        fb.auth().signOut();
        this.$router.replace("/");
      } catch (error) {
        console.log("Sorry you can not logout", error);
      }
    },
  },
  created() {
    var user = fb.auth().currentUser;
    this.email = user.email;
  },
};
</script>
