<template>
<div>
<p><strong>Tweet</strong></p>
<div v-if="tweet">
    <div class="tweet-card row">
        <div class="tweet-image col-sm-2">
            <img :src="tweet.user.imagePath" class="thumbnail-image">
        </div>
        <div class="tweet-content col-sm-10">
            <div class="tweet-header row">
                <strong>{{ tweet.user.name }}</strong>@{{ tweet.user.username }} - {{formatDate(tweet.created)}}
            </div>
            <div class="tweet-text row">
                {{ tweet.content }}
            </div>
            <div class="tweet-footer row" style="height: 40px;">
                <div class="col-sm-2 text-center">
                    <button @click="likeTweet(tweet)">
                        <div class="icon-container">
                            <font-awesome-icon icon="heart" />
                        </div>
                        <span class="count-container">{{ tweet.likeCount }}</span>
                    </button>
                </div>
                <div class="col-sm-2 text-center">
                    <button @click="retweetTweet(tweet)">
                        <div class="icon-container">
                            <font-awesome-icon icon="retweet" />
                        </div>
                        <span class="count-container">{{ tweet.retweetCount }}</span>
                    </button>
                </div>
                <div class="col-sm-2 text-center">Share</div>
            </div>
        </div>
    </div>
    <p class="mt-xlg" ><strong>Comments:</strong></p>
    <hr>
    <div v-for="comment in comments" v-bind:key="comment._id"> 
        <p>{{comment.user.name}}, {{formatDate(comment.created)}}</p>
        <p>{{comment.contents}}</p>
        <hr>
    </div>
    <div v-if="user">
        <div class="mt-xlg">
            <p><strong>Leave a comment:</strong></p>
            <p v-if="error" class="error">{{error}}</p>
            <form @submit.prevent="addComment">
            <textarea v-model="contents"></textarea>
            <br />
            <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</div>
  
</div>
</template>

<script>
import moment from 'moment';
// import { constants } from 'crypto';
// import { constants } from 'crypto';
// @ is an alias to /src
export default {
name: 'tweet',
data() {
    return {
    contents: '',
    error: '',
    }
},
computed: {
    tweet() {
        return this.$store.state.tweet;
    },
    user() {
        return this.$store.state.user;
    },
    comments() {
        return this.$store.state.comments;
    }
},
async created() {
    this.$store.commit('setTweetID', this.$route.params.id);
    await this.$store.dispatch("getSingleTweet");
    await this.$store.dispatch("getComments");
},
methods: {
    formatDate(date) {
        if (moment(date).diff(Date.now(), 'days') < 15)
            return moment(date).fromNow();
        else
            return moment(date).format('d MMMM YYYY');
    },
    async commentAdded() {
        try {
            this.error = await this.$store.dispatch("getComments");
        } catch (error) {
            console.log(error);
        }
    },
    async addComment() {
        try {
            let comment = { contents: this.contents, tweet: this.tweet._id };
            this.error = await this.$store.dispatch("addComment", comment);
            if (!this.error) {
                this.contents = '';
                this.commentAdded();
            }
        } catch (error) {
            console.log(error);
        }
    },
    async likeTweet(tweet) {
        this.$store.commit('setTweet', tweet);
        await this.$store.dispatch("updateTweetLikes");
        await this.$store.dispatch("getAllTweets");
    },
    async retweetTweet(tweet) {
        this.$store.commit('setTweet', tweet);
        await this.$store.dispatch("updateTweetRetweets");
        await this.$store.dispatch("getAllTweets");
    },
},

}
</script>

<style scoped>
.tweetDate {
margin: 0px;
font-size: 0.9em;
font-weight: normal;
}
p {
margin: 0px;
}
.image {
margin: 0 0 1.5em;
display: inline-block;
width: 100%;
}
.image img {
max-width: 600px;
max-height: 600px;
image-orientation: from-image;
}
textarea {
font-size: 1.6em;
width: 100%;
max-width: 500px;
height: 100px;
}
input, textarea, select, button {
font-family: 'Arimo', sans-serif;
font-size: 1em;
}
.comment {
padding: 10px 10px 10px 0;
border-bottom: solid gray 1px;
}
.mt-xlg {
margin-top: 25px;
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