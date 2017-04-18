<template>
  <div>
    <span>游戏已结束!</span>
  </div>
</template>

<script>
  export default {
    name: 'outDate'
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
div
  display: flex
  position: relative
  height: 100%
  &:after
    z-index: -2
    content: ''
    background: url('../assets/interface@2x.jpg') center/100%
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
      background: url('../assets/interface@3x.jpg') center/100%
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    margin: -4px
    filter: blur(4px)
  &:before
    content: ''
    background: rgba(0, 0, 0, 0.4)
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: -1
  span
    margin: auto
    letter-spacing: 2.5px
    font-size: 16px
    color: #ffdc54
</style>
