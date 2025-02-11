<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/TheHeader.vue";
import Footer from "@/components/TheFooter.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
  },
};
</script>
