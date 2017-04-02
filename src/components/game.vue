<template>
  <div>
  <div>
    游戏....
  </div>
  <div v-if="!over">剩余时间: {{time}}s</div>
  <div v-if="over">游戏结束！</div>
  </div>
</template>

<script>
  export default {
    name: 'game',
    data() {
      return {
        time: 20,
        over: false
      }
    },
    created() {
      localStorage.setItem('played', 'true');
      this.curTime();
    },
    methods: {
      curTime() {
        let listenTime = setInterval(() => {
          this.time -= 1;
          if (this.time === 0) {
            clearInterval(listenTime);
            this.over = true;
          }
        }, 1000);
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
