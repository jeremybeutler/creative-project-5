<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" id="nav-home">
            <router-link id="logo" to="/">Tweeter</router-link>
          </li>
          <li class="nav-item" id="nav-feed">
            <router-link class="nav-link" to="/feed"><font-awesome-icon icon="home"/> Feed</router-link>
          </li>
          <li class="nav-item" id="nav-login">
            <router-link class="nav-link" to="/login"><font-awesome-icon icon="bell"/> Login</router-link>
          </li>
          <li class="nav-item" id="nav-admin">
            <router-link class="nav-link" to="/admin"><font-awesome-icon icon="tools"/> Admin</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#logo {
    font-size: 24px;
    padding-top: 0px;
    color: rgb(42, 170, 212);
}
</style>
