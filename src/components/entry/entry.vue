<template>
  <div class="root">
      <span>
        <router-link :to="toggle">进入游戏</router-link>
      </span>
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
  align-items: flex-end
  justify-content: center
  background: url(./img/interface@2x.jpg) center/100%
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
    background: url(./img/interface@3x.jpg) center/100%
   span
     font-size: 15px
     letter-spacing: 1.5px
     width: 137px
     margin-bottom: 62%
     background: url(./img/button1@2x.png) center/100% no-repeat
     @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
       background: url(./img/button1@3x.png) center/100% no-repeat
     height: 36px
     line-height: 36px


</style>
