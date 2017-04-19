<template>
  <div class="root">
    <template>
    <div id="container" :class="{'blur': over}">

    </div>
      <div class="ready" v-if="ready"><span>{{ready}}</span></div>
    <div class="info" v-if="!over">
      <el-card class="box-card">
        <div>剩余时间: {{time}}s</div>
        <div>任务进度: {{foundCount}}/8</div>
      </el-card>
    </div>
    </template>
    <div class="overInfo" v-if="over">
      <div class="item">
        <p>恭喜你,找到{{foundCount}}个欧蓝德汽车,<br>
        打败了{{people}}的人。</p>
        <router-link to="/get" class="get">领取牛币</router-link>
        </div>
    </div>
  </div>
</template>

<script>
  import img_1 from './img/shanghai-min.jpg';
  import img_2 from './img/car.png';
  const THREE = require('three');
  export default {
    name: 'game',
    data() {
      return {
        time: 20,
        ready: 5,
        foundCount: 0,
        over: false
      }
    },
    computed: {
      money() {
        switch (true) {
          case this.foundCount === 0:
            return 0;
          case this.foundCount === 1:
            return 1;
          case this.foundCount <= 5:
            return 10;
          default:
            return 20;
        }
      },
      people() {
        return `${Math.floor(this.foundCount / 8 * 100)}%`;
      }
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
      },
      curReady() {
        let listenReady = setInterval(() => {
          this.ready -= 1;
          if (this.ready === 0) {
            clearInterval(listenReady);
            this.curTime();
          }
        }, 1000);
      },
      init,
      animate,
      addEvent
    },
    mounted() {
      this.init();
      this.animate();
      this.addEvent();
      this.curReady();
    }
  }
  let camera, scene, renderer;

  let isUserInteracting = false,
    onPointerDownPointerX = 0, onPointerDownPointerY = 0,
    lon = 0, onPointerDownLon = 0,
    lat = 0, onPointerDownLat = 0,
    phi = 0, theta = 0,
    startDistance = 0;
  const materSky = new THREE.TextureLoader().load(img_1);
  const materCar = new THREE.TextureLoader().load(img_2);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const scores = [];
  const foundAll = function () {
    return !scores.includes(false);
  };

  function init() {

    let container, mesh;

    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);

    scene = new THREE.Scene();

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      map: materSky
    });
// 新建LOGO
    mesh = new THREE.Mesh(geometry, material);
    const logoMaterial = new THREE.SpriteMaterial({
      map: materSky,
      color: 0xffffff,
      fog: true
    });
    let logo = new THREE.Sprite(logoMaterial);
    logo.scale.set(200, 200, 1);
    logo.position.y = 1000;
    let logoBottom = logo.clone();
    logoBottom.position.y = -1000;
    scene.add(logo);
    scene.add(logoBottom);
    scene.add(mesh);
    /* add the spirits here */

    function createSprite() {
      let spriteMaterial = new THREE.SpriteMaterial({
        map: materCar,
        color: 0xffffff,
        fog: true
      });
      let sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(20, 20, 1);
      sprite.position.x = 300 * Math.random() * (Math.random() > 0.5 ? 1 : -1);
      sprite.position.y = 300 * Math.random() * (Math.random() > 0.5 ? 1 : -1);
      sprite.position.z = 300 * Math.random() * (Math.random() > 0.5 ? 1 : -1);
      return sprite;
    }
    for (let i = 0; i < 8; i++) {
      let sprite = createSprite();
      scores[sprite.id] = false;
      scene.add(sprite);
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
  }
function addEvent() {
  container.addEventListener('mousedown', onDocumentMouseDown(this), false);
  container.addEventListener('mousemove', onDocumentMouseMove, false);
  container.addEventListener('mouseup', onDocumentMouseUp, false);
  container.addEventListener('wheel', onDocumentMouseWheel, false);

  //

  container.addEventListener('dragover', function (event) {

    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';

  }, false);

  container.addEventListener('dragenter', function (event) {

    document.body.style.opacity = 0.5;

  }, false);

  container.addEventListener('dragleave', function (event) {

    document.body.style.opacity = 1;

  }, false);

  container.addEventListener('drop', function (event) {

    event.preventDefault();

    var reader = new FileReader();
    reader.addEventListener('load', function (event) {

      material.map.image.src = event.target.result;
      material.map.needsUpdate = true;

    }, false);
    reader.readAsDataURL(event.dataTransfer.files[0]);

    document.body.style.opacity = 1;

  }, false);

  //

  container.addEventListener('resize', onWindowResize, false);
  /* bind touch events */
  container.addEventListener('touchstart', onTouchstart(this), false);
  document.addEventListener('touchmove', (event) => {
    event.preventDefault();
  }, false);
  container.addEventListener('touchmove', onTouchmove, false);
  container.addEventListener('touchend', onTouchend, false);
  window.addEventListener('deviceorientation', onDeviceOrientation, false);
    /* The End */
  }
  /* touch event handlers */
  function onTouchstart(vm) {
    return function (event) {

      isUserInteracting = true;

      onPointerDownPointerX = event.changedTouches[0].pageX;
      onPointerDownPointerY = event.changedTouches[0].pageY;

      onPointerDownLon = lon;
      onPointerDownLat = lat;

      /* click events */
      mouse.x = (event.changedTouches[0].pageX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.changedTouches[0].pageY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        if (intersects[0].object.id > 5) {
          intersects[0].object.material.map = new THREE.TextureLoader().load(require('./img/one.png'));
          intersects[0].object.scale.set(20, 20, 1);
          if ( scores[intersects[0].object.id] === false) {
            let t = 20;
            (function timego() {
              intersects[0].object.position.y += 1;
              t--;
              let a = requestAnimationFrame(timego);
              if (t === 0) {
                intersects[0].object.visible = false;
                cancelAnimationFrame(a);
              }
            })();
            scores[intersects[0].object.id] = true;
            vm.foundCount += 1;
          }
          if (foundAll()) {
            vm.over = true;
          }
        }
      }
      /* The End */
    }
  }

  function onTouchmove(event) {
    if (event.changedTouches[1] == undefined) {// 单点触控
      if (isUserInteracting === true) {
        lon = (onPointerDownPointerX - event.changedTouches[0].pageX) * 0.1 + onPointerDownLon;
        lat = (event.changedTouches[0].pageY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
      }
    } else {// 双点触控
      const deltaX = 15,
        currentDistance = Math.pow(event.changedTouches[1].pageX - event.changedTouches[0].pageX, 2) + Math.pow(event.changedTouches[1].pageY - event.changedTouches[0].pageY, 2);
      if (currentDistance < startDistance) {
        camera.fov += deltaX * 0.05;
      } else {
        camera.fov -= deltaX * 0.05;
      }
      startDistance = currentDistance;
      camera.updateProjectionMatrix();
    }

  }

  function onTouchend(event) {

    isUserInteracting = false;

  }
let alpha, beta, gamma, changeA, changeB;

  function onDeviceOrientation(event) {
    if (alpha) {
      changeA = event.alpha + event.gamma - alpha - gamma;
      changeB = event.beta  - beta ;
      lon = lon + changeA;
      lat = lat + changeB;
    }
    alpha = event.alpha;
    beta = event.beta;
    gamma = event.gamma;
  }
  /* The End */

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function onDocumentMouseDown(vm) {
    return function (event) {

      event.preventDefault();

      isUserInteracting = true;

      onPointerDownPointerX = event.clientX;
      onPointerDownPointerY = event.clientY;

      onPointerDownLon = lon;
      onPointerDownLat = lat;

      /* click events */
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        if (intersects[0].object.id > 5) {
          intersects[0].object.material.map = new THREE.TextureLoader().load(require('./img/one.png'));
          intersects[0].object.scale.set(20, 20, 1);
          if (scores[intersects[0].object.id] === false) {
            let t = 20;
            (function timego() {
              intersects[0].object.position.y += 1;
              t--;
              let a = requestAnimationFrame(timego);
              if (t === 0) {
                intersects[0].object.visible = false;
                cancelAnimationFrame(a);
              }
            })();
            scores[intersects[0].object.id] = true;
            vm.foundCount += 1;
          }
          if (foundAll()) {
            vm.over = true;
          }
        }
      }
      /* The End */
    }
  }

  function onDocumentMouseMove( event ) {

    if ( isUserInteracting === true ) {

      lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
      lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

    }

  }

  function onDocumentMouseUp( event ) {

    isUserInteracting = false;

  }

  function onDocumentMouseWheel( event ) {

    camera.fov += event.deltaY * 0.05;
    camera.updateProjectionMatrix();

  }

  function animate() {

    requestAnimationFrame( animate );
    update();

  }

  function update() {

    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
    camera.target.y = 500 * Math.cos( phi );
    camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( camera.target );

    /*
     // distortion
     camera.position.copy( camera.target ).negate();
     */

    renderer.render( scene, camera );

  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .root
    position: relative
    height: 100%
    .info
      position: absolute
      z-index: 10
      top: 10px
      left: 10px
    .overInfo
      display: flex
      text-align: center
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba(0, 0, 0, 0.4)
      .item
        margin: auto
        text-align: center
        p
          line-height: 25px
          margin-bottom: 35px
          letter-spacing: 2.5px
          font-size: 16px
          color: #ffdc54
        .get
          display: inline-block
          width: 137px
          background: url('./img/button1@2x.png') center/100% no-repeat
          @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
            background: url('./img/button1@3x.png') center/100% no-repeat
          height: 36px
          line-height: 36px
          color: #000
    .ready
      position: absolute
      top: 0
      left: 0
      bottom: 0
      right: 0
      background: rgba(0, 0, 0, 0.6)
      display:flex
      justify-content: center
      align-items: center
      span
        color: white
        font-size: 100px
  .blur
    filter: blur(3px)

</style>
