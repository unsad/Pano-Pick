<template>
  <div class="warp">
  <p v-if="loading">资源加载中...</p>
  <div v-if="!loading" class="root">
      <span>
        <router-link :to="toggle">进入游戏</router-link>
      </span>
  </div>
  </div>
  </template>
<script>
  import img1 from '../game/img/shanghai-min.jpg';
  import img2 from './img/interface@2x.jpg';

  export default {
    name: 'entry',
    data() {
      return {
        toggle: '/game',
        loading: 2,
        imgArr: [img1, img2]
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
      loading(this.imgArr, this)
    }
  };

  function loading(imgArr, vm) {
    for (let img of imgArr) {
      let image = new Image();
      image.src = img;
      image.onload = function () {
        vm.loading -= 1;
      }
    }
  }

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.warp
  height: 100%
  text-align: center
  &:after
    content: ''
    display: inline-block
    height: 100%
    vertical-align: middle
  p
    display: inline-block
    vertical-align: middle
.root
  height: 100%
  text-align: center
  display: flex
  align-items: flex-end
  justify-content: center
  background: url(./img/interface@2x.jpg) center/cover
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
    background: url(./img/interface@3x.jpg) center/cover
   span
     font-size: 15px
     letter-spacing: 1.5px
     width: 137px
     margin-bottom: 30vh
     background: url(./img/button1@2x.png) center/100% no-repeat
     @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
       background: url(./img/button1@3x.png) center/100% no-repeat
     height: 36px
     line-height: 36px
</style>
