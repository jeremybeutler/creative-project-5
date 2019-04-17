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
          <li class="nav-item" id="nav-profile">
            <router-link class="nav-link" to="/profile"><font-awesome-icon icon="user"/> Profile</router-link>
          </li>
          <li class="nav-item" id="nav-logout" v-if="user">
            <a href="/" class="nav-link" @click="logout"><font-awesome-icon icon="sign-out-alt"/> Logout</a>
          </li>
        </ul>
        <button @click="toggleTweet" id="tweet">Tweet</button>
      </div>
    </nav>
    <escape-event @escape="escape"></escape-event>
    <tweet :show="show" @escape="escape" @tweetFinished="tweetFinished"></tweet>
    <router-view/>
    <footer class="container login-footer">
      <p>©2018-2019 Tweeter, Inc. <a href="#">Privacy </a><a href="#">Terms</a></p>
      <a href="https://github.com/jrem13/creative-project-5">Github repo</a>
    </footer>
  </div>
</template>

<script>
import EscapeEvent from '@/components/EscapeEvent.vue'
import Tweet from '@/components/Tweet.vue'

export default {
  name: 'app',
  components: {
    EscapeEvent,
    Tweet,
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    tweets() {
      return this.$store.state.tweets;
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyTweets");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    escape() {
      this.show = false;
    },
    toggleTweet() {
      this.show = true;
    },
    async tweetFinished() {
      this.show = false;
      try {
        this.error = await this.$store.dispatch("getMyTweets");
      } catch (error) {
        console.log(error);
      }
      try {
        this.error = await this.$store.dispatch("getAllTweets");
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

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

footer.login-footer {
  position: absolute;
  bottom: 0px;
  margin-left: 20%;
  background-color: gainsboro;
}

#tweet {
    background-color: rgb(42, 170, 212);
    border-radius: 25px;
    padding: 5px 15px;
    color: white;
}

/* Modals */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h1 {
  margin-bottom: 30px;
  font-size: 1.5em;
}

.modal-body {
  margin: 0;
}

.modal-body input {
  margin-bottom: 20px;
  height: 30px;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.modal-default-button {
  float: right;
}

/*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

footer {
  position:fixed;
  left:0px;
  bottom:0px;
  height:30px !important;
  width:100%;
  background:#999;
}
</style>
