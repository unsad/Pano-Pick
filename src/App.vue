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
  font-family: 'fzzhunyuan-m02sregular'
  body
    height: 100%
    margin: 0
    a
      text-decoration: none
#app
  height: 100%

@font-face
  font-family: 'fzzhunyuan-m02sregular'
  src: url(/Pano-Pick/dist/static/fonts/_-webfont.ttf) format('truetype')
  font-weight: normal
  font-style: normal
</style>
