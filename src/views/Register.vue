<template>
<div class="register">
  <div class="box">
    <div>Register</div><div v-if="error" class="error">{{error}}</div>
    <form method="post" @submit.prevent="register">
      <input type="text" name="username" placeholder="Username" class="input" v-model="username">
      <input type="password" name="password" placeholder="Password" class="input" v-model="password">
      <input type="text" name="fName" placeholder="First Name" class="input" v-model="firstname">
      <input type="text" name="lName" placeholder="Last Name" class="input" v-model="lastname">
      <input type="submit" class="registerbutton" name="Register" value="Register">
    </form>
    <p>Already have an accout? <router-link to="/login">Login</router-link></p>
  </div>
</div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      error: '',
    }
  },
  computed: {
    name() {
      return this.firstname + " " + this.lastname;
    },
  },
  methods: {
    async register() {
      try {
        this.error = await this.$store.dispatch("register", {
          name: this.name,
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

.registerbutton {
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
