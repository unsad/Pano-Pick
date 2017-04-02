<template>
  <div>
    <h1>翻转羊城八景</h1>
      <ol>
        <li>时间</li>
        <li>寻找</li>
        <li>本活动</li>
        <li>。。。</li>
      </ol>
  <router-link :to="toggle">进入游戏</router-link>
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
      },
      checkStorage() {
        let played = localStorage.getItem('played');
        if (played) {
          this.toggle = '/invite';
        }
      }
    },
    created() {
      this.checkDate();
      if (this.toggle !== '/outDate') {
        this.checkStorage();
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
