<template>
  <div id="app">
    <div id="nav">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" id="nav-home">
                    <a class="nav-link" id="logo" href="index.html">Tweeter</a>
                </li>
                <li class="nav-item" id="nav-feed">
                    <a class="nav-link" href="feed.html"><i class="fas fa-home"></i> Feed</a>
                </li>
                <li class="nav-item" id="nav-login">
                    <a class="nav-link" href="login.html"><i class="fas fa-bell"></i> Login</a>
                </li>
                <li class="nav-item" id="nav-admin">
                    <a class="nav-link" href="admin.html"><i class="fas fa-tools"></i> Admin</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" id="search" type="submit"><i
                        class="fas fa-search"></i></button>
            </form>
            <button id="tweet" data-toggle="modal" data-target="#tweetModal">Tweet</button>
        </div>
    </nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
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
</style>
