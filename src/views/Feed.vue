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
  </div>
  <div v-else class="box">
    <p>If you would like to access your feed, <br>please register for an account or login.</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'feed',
  components: {
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  async created() {
    await this.$store.dispatch("getUser");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
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
</style>