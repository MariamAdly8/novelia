<template>
  <navBar></navBar>
  <div id="app">
    <router-view></router-view>
  </div>
  <appFooter></appFooter>
</template>

<script>
  import navBar from "./components/navbar.vue";
  import appFooter from "./components/footer.vue";
  export default {
    name: 'App',
    components: {
      navBar,
      appFooter,
    }
  }
</script>

<style>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-wrapper > :nth-child(2) {
  flex: 1;
}
</style>
