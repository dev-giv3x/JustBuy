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

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
html,
body {
  font-family: Arial, sans-serif;
  background: #f4f4f4;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
}
footer {
  padding: 10px;
  margin-top: auto;
}
</style>
