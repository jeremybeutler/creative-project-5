<template>
<div>
  <div v-if="user">
    <div class="header">
      <div>
        <h1>{{user.name}}</h1>
      </div>
      <div>
        <p>
          <a href="#" @click="logout"><font-awesome-icon icon="sign-out-alt"/></a>
        </p>
      </div>
    </div>
    <div class="columns-container row">
      <div class="col-sm-3">
      </div>
      <div class="feed-column col-sm-6">
          <div v-for="tweet in tweets" v-bind:key="tweet._id">
              <div class="tweet-card row">
                  <div class="tweet-image col-sm-2">
                      <img :src="tweet.usrImgPath" class="thumbnail-image">
                  </div>
                  <div class="tweet-content col-sm-10">
                      <div class="tweet-header row">
                          <strong>{{ tweet.user.name }}</strong>@{{ tweet.user.username }} - {{formatDate(tweet.created)}}
                      </div>
                      <div class="tweet-text row">
                          {{ tweet.content }}
                      </div>
                      <div class="tweet-footer row" style="height: 40px;">
                          <div class="col-sm-2 text-center">Comment</div>
                          <div class="col-sm-2 text-center">
                              <button @click="likeTweet(tweet)">
                                  <div class="icon-container">
                                      <i class="far fa-heart"></i>
                                  </div>
                                  <span class="count-container">{{ tweet.likeCount }}</span>
                              </button>
                          </div>
                          <div class="col-sm-2 text-center">
                              <button @click="retweetTweet(tweet)">
                                  <div class="icon-container">
                                      <i class="fas fa-retweet"></i>
                                  </div>
                                  <span class="count-container">{{ tweet.retweetCount }}</span>
                              </button>
                          </div>
                          <div class="col-sm-2 text-center">Share</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-sm-4">
      </div>
  </div>
  </div>
  <div v-else class="box">
    <p>If you would like to access your feed, <br>please register for an account or login.</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'feed',
  components: {
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
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    async likeTweet(tweet) {
        this.$store.commit('setTweet', tweet);
        await this.$store.dispatch("updateTweetLikes");
        await this.$store.dispatch("getMyTweets");
        
    },
    async retweetTweet(tweet) {
        this.$store.commit('setTweet', tweet);
        await this.$store.dispatch("updateTweetRetweets");
        await this.$store.dispatch("getMyTweets");
    },
  }
}
</script>

<style scoped>
.header {
  display: flex;
}

.header a {
  padding-left: 50px;
  color: #222;
  font-size: 2em;
}

.header svg {
  margin-top: 12px;
}

.box {
    position: absolute;
    width: 500px;
    height: 300px;
    top: 50%;
    left: 50%;
    margin: -150px 0 0 -250px;
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    color: #424242;
}
body {
    background-color: #e6ecf0;
}

.columns-container {
    height: 1400px;
    margin-top: 0px;
}

.feed-column {
    height: 1175px;
}

#tweet {
    background-color: rgb(42, 170, 212);
    border-radius: 25px;
    padding: 5px 15px;
    color: white;
}

.tweet-card {
    border-radius: 10px;
    margin-top: 5px;
    height: 190px;
    padding: 5px;
    border-bottom: 1px solid gray;
    background-color: #fff;
}

.tweet-content {
    padding: 10px 5px 5px 5px;
}

.tweet-header {
    height: 40px;
}

.tweet-text {
    height: 100px;
}

.tweet-footer {
    height: 40px;
}

.thumbnail-image {
    border-radius: 50%;
    height: 55px;
    width: 55px;
    margin-top: 55px;
}

#search {
    color: darkgray;
    border: none;
    margin-right: 20px;
}

#search:hover {
    background-color: darkgray;
    color: white;
}

.box {
    position: absolute;
    width: 500px;
    height: 300px;
    top: 50%;
    left: 50%;
    margin: -150px 0 0 -250px;
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    color: #424242;
}

.input {
    width: 80%;
    height: 30px;
    margin: 5px;
    border-radius: 2px;
    text-align: left;
    padding: 5px;
    border: 1px solid #45c693;
}

.login {
    width: 83%;
    height: 40px;
    font-size: 16px;
    border-radius: 2px;
    text-align: center;
    background-color: rgb(42, 170, 212);
    color: white;
    margin-left: 10px;
    margin-bottom: 10px;
}

.login:disabled {
    background-color: lightgrey;
}

.error {
    position: absolute;
    width: 30%;
    height: 10px;
    top: 17px;
    right: 20px;
    color: red;
    font-size: 12px;
}

#profile {
    border-radius: 50%;
    width: 70%;
    margin: auto;
    display: block;
}

#info {
    display: block;
    margin: auto;
}

#info>h1 {
    text-align: center;
}

footer {
    background-color: #fff;
}

footer.login-footer {
    margin-top: 825px;
}

div.icon-container {
    display: inline-block;
}

#logo {
    font-size: 24px;
    padding-top: 0px;
    color: rgb(42, 170, 212);
}

.delete-tweet {
    position: absolute;
    left: 92%;
}

.mt-md {
    margin-top: 15px !important;
}
</style>