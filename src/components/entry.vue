<template>
  <div class="root">
    <div class="content">
      <h1>翻转羊城八景</h1>
      <ul>
        <li>时间</li>
        <li>寻找</li>
        <li>本活动</li>
        <li>。。。</li>
      </ul>
      <el-button type="primary">
        <router-link :to="toggle">进入游戏</router-link>
      </el-button>
    </div>
  </div>
  </template>
<script>
  export default {
    name: 'entry',
    data() {
      return {
        toggle: '/game'
      }
    },
    methods: {
      checkDate() {
        let compare = Date.now() - new Date(2017, 4, 3);
        this.toggle = compare < 0 ? '/game' : '/outDate';
      }
    },
    created() {
      this.checkDate();
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.root
  height: 100%
  text-align: center
  display: flex
  align-items: center
  justify-content: center
a
  text-decoration: none
ul
  list-style-type: none
  padding: 0

</style>
