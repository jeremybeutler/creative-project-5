<template>
<div class="home">
  <div id="blue">
    <h2>Stay up to date on all <br>the latest news!</h2>
  </div>
  <div id="white">
    <h2>See what your friends are <br>up to on Tweeter!</h2>
  </div>
</div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  computed: {
  },
}
</script>

<style>
#blue {
  width: 50%;
  height: 100%;
  position: absolute;
  background-color: #1da1f2;
  color: white;
  padding-top: 20%;
}
#white {
  float: right;
  margin-top: 20%;
  width: 50%;
}
</style>