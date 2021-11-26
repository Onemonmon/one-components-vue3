<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/basic-select">basic-select</router-link> |
    <router-link to="/basic-radio">basic-radio</router-link>
  </div>
  <div id="main"><router-view /></div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  margin-bottom: 10px;
}

#main {
  margin: 10px;
  padding: 10px;
  border: 1px solid #eee;
}
</style>
