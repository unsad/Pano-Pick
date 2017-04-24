<template>
  <div class="warp">
    <div class="warp-1" v-if="loading">
    <div class="p">
      <div class="loading">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
      <div>资源加载中</div>
    </div>
    </div>
  <div v-if="!loading" class="root">
      <span>
        <router-link :to="toggle">进入游戏</router-link>
      </span>
  </div>
  </div>
  </template>
<script>
  import img1 from '../../assets/shanghai-min.jpg';
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
      let image = document.createElement('img');
      image.src = img;
      image.onload = function () {
        vm.loading -= 1;
      }
    }
  }

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
a
  color: #000
.warp
  height: 100%
  text-align: center
  .warp-1
    height: 100%
    &:after
      content: ''
      display: inline-block
      height: 100%
      vertical-align: middle
  .p
    color: #1c8de0
    display: inline-block
    vertical-align: middle
    .loading
      position: relative
      height: 80px
      width: 80px
      margin-bottom: 10px
      .double-bounce1,.double-bounce2
        border-radius: 50%
        background-color: #0062e0
        left: 0
        top: 0
        bottom: 0
        right: 0
        position: absolute
        opacity: .6
      .double-bounce1
        animation: bounce1 2s infinite ease-in-out 0s
      .double-bounce2
        animation: bounce2 2s infinite ease-in-out 0s
  .root
    height: 100%
    text-align: center
    display: flex
    align-items: flex-end
    justify-content: center
    background: url(./img/interface@2x.jpg) center/cover
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

@keyframes bounce1 {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
@keyframes bounce2 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0);
  }
}

</style>
