<template>
  <div class="home">
    <Navbar />
    <Hero />
    <Products />
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Hero from "@/components/Hero.vue";
import Login from "@/components/Login.vue";
import Products from "@/sections/Products.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Hero,
    Products,
    Login
  }
};
</script>
