<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/favourites">Favourites</router-link> |
      <router-link to="/compare">Compare</router-link>
    </div>
    <div class="container-fluid">
      <router-view/>
    </div>
  </div>
</template>

<style>
body {
  background-color: #f9fbfd !important;
  font-family: "Cerebri Sans",sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.cursor-pointer {
  cursor: pointer !important;
}
</style>
