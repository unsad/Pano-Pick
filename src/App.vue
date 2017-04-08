<template>
  <div id="app">
    <router-view name="window"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
html
  height: 100%
  line-height: 1
  body
    height: 100%
    margin: 0
#app
  height: 100%
</style>
