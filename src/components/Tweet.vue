<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" v-if="user">
        <div class="modal-header">
          <h1 class="modal-title">Tweet</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="postTweet">
            <textarea v-model="content" placeholder="What's on your mind?"></textarea>
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-secondary">Submit</button>
          </form>
        </div>
      </div>
      <div class="modal-container" v-else>
        <p>If you would like to tweet, <br>please register for an account or login.</p>
        <button type="button" @click="close" class="pure-button">Close</button>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'Tweet',
  props: {
    show: Boolean,
  },
  data() {
    return {
      content: '',
      error: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    close() {
        this.$emit('escape');
    },    
    async postTweet() {
        try {
            this.error = await this.$store.dispatch("postTweet", {
                content: this.content,
            });
            if (!this.error) {
                this.content = '';
                this.$emit('tweetFinished');
            }
        } catch (error) {
            console.log(error);
        }
    },
  }
}
</script>

<style scoped>
input {
  width: 100%;
}
textarea {
  width: 100%;
  height: 100px
}
.pure-button-secondary {
  float: right;
}
</style>