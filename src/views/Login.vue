<template>
<div class="login">
  <div class="box">
    <div>Login</div><div v-if="error" class="error">{{error}}</div>
    <form method="post" @submit.prevent="login">
      <input type="text" name="username" placeholder="Username" class="input" v-model="username">
      <input type="password" name="password" placeholder="Password" class="input" v-model="password">
      <input type="submit" class="loginbutton" name="Login" value="Login">
    </form>
    <p>Don't have an accout? <router-link to="/register">Regster</router-link></p>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async login() {
      try {
        this.error = await this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
        if (this.error === "")
          this.$router.push('feed');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.box {
    width: 500px;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid black;
    margin-top: 10%;
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

.loginbutton {
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

.error {
  color: red;
  font-size: 12px;
}
</style>
