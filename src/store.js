import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    tweets: [],
    tweet: null,
    comments: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setTweets(state, tweets) {
      state.tweets = tweets;
    },
    setTweet(state, tweet) {
      state.tweet = tweet;
    },
    setTweetID (state, id) {
      state.tweetID = id;
    },
    setComments (state, comments) {
      state.comments = comments;
    },
  },
  actions: {
    async register(context, data) {
      try {
        console.log(data);
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async postTweet(context, data) {
      try {
        await axios.post('/api/tweets', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getMyTweets(context) {
      try {
        let response = await axios.get("/api/tweets");
        context.commit('setTweets', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllTweets(context) {
      try {
        let response = await axios.get("/api/tweets/all");
        context.commit('setTweets', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async updateTweetLikes() {
      try {
        await axios.put("/api/tweets/likeTweet/" + this.state.tweet._id);
        return "";
      }
      catch(error) {
        return "";
      }
    },
    async updateTweetRetweets() {
      try {
        await axios.put("/api/tweets/retweetTweet/" + this.state.tweet._id);
        return "";
      }
      catch(error) {
        return "";
      }
    },
    async getSingleTweet(context) {
      try {
        let response = await axios.get("/api/tweets/single/" + this.state.tweetID);
        context.commit('setTweet', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async addComment(context, data) {
      try {
        await axios.post('/api/comments', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getComments(context) {
      try {
        let response = await axios.get("/api/comments");
        // console.log(response.data)
        // console.log(this.state.photo._id);
        let tweetComments = [];
        for (let comment in response.data)
          if (response.data[comment].tweet._id == this.state.tweet._id)
            tweetComments.push(response.data[comment]);
            
        context.commit('setComments', tweetComments);
        return "";
      } catch (error) {
        return "";
      }
    },
  }
})
