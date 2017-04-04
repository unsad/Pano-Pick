<template>
  <div class="root">
    <div v-if="!over" id="container"></div>
    <div class="info">
      <div v-if="!over">剩余时间: {{time}}s</div>
      <div v-show="over">
        <router-link to="/getMoney">恭喜你找到{{foundCount}}个拼图，领取牛币</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  const THREE = require('three');
  export default {
    name: 'game',
    data() {
      return {
        time: 600,
        over: false,
        foundCount: 0
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
      },
      init,
      animate,
      addEvent
    },
    mounted() {
      this.init();
      this.animate();
      this.addEvent();
    }
  }
  var camera, scene, renderer;

  var isUserInteracting = false,
    onPointerDownPointerX = 0, onPointerDownPointerY = 0,
    lon = 0, onPointerDownLon = 0,
    lat = 0, onPointerDownLat = 0,
    phi = 0, theta = 0,
    startDistance = 0;

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  var scores = { '4': false, '5': false, '6': false, '7': false, '8': false };
  var foundAll = function () {
    var r = true;
    for (var i = 4; i < 9; i++) {
      r = r && scores[i];
    }
    return r;
  };

  function init() {

    var container, mesh;

    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);

    scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    var material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('http://oe9g187nt.bkt.clouddn.com/img/2294472375_24a3b8ef46_o.jpg')
    });

    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
    /* add the spirits here */
    var spriteMaterial = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load('http://oe9g187nt.bkt.clouddn.com/img/sprite1.png'),
      color: 0xffffff,
      fog: true
    });

    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(5, 5, 1);
    sprite.position.x = 225;
    sprite.position.y = 105;
    sprite.position.z = 400;

    scene.add(sprite);

    var spriteMaterial_1 = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load('http://oe9g187nt.bkt.clouddn.com/img/sprite1.png'),
      color: 0xffffff,
      fog: true
    });

    var sprite_1 = new THREE.Sprite(spriteMaterial_1);
    sprite_1.scale.set(7, 7, 1);
    sprite_1.position.x = 400;
    sprite_1.position.y = -250;
    sprite_1.position.z = 50;

    scene.add(sprite_1);

    var spriteMaterial_2 = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load('http://oe9g187nt.bkt.clouddn.com/img/sprite1.png'),
      color: 0xffffff,
      fog: true
    });

    var sprite_2 = new THREE.Sprite(spriteMaterial_2);
    sprite_2.scale.set(10, 10, 1);
    sprite_2.position.x = 380;
    sprite_2.position.y = 280;
    sprite_2.position.z = 10;

    scene.add(sprite_2);

    var spriteMaterial_3 = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load('http://oe9g187nt.bkt.clouddn.com/img/sprite1.png'),
      color: 0xffffff,
      fog: true
    });

    var sprite_3 = new THREE.Sprite(spriteMaterial_3);
    sprite_3.scale.set(10, 10, 1);
    sprite_3.position.x = -300;
    sprite_3.position.y = -250;
    sprite_3.position.z = 10;

    scene.add(sprite_3);

    var spriteMaterial_4 = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load('http://oe9g187nt.bkt.clouddn.com/img/sprite1.png'),
      color: 0xffffff,
      fog: true
    });

    var sprite_4 = new THREE.Sprite(spriteMaterial_4);
    sprite_4.scale.set(6, 6, 1);
    sprite_4.position.x = -300;
    sprite_4.position.y = -230;
    sprite_4.position.z = -300;

    scene.add(sprite_4);

    /* The End */

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
  }
function addEvent() {
  document.addEventListener('mousedown', onDocumentMouseDown(this), false);
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
  document.addEventListener('wheel', onDocumentMouseWheel, false);

  //

  document.addEventListener('dragover', function (event) {

    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';

  }, false);

  document.addEventListener('dragenter', function (event) {

    document.body.style.opacity = 0.5;

  }, false);

  document.addEventListener('dragleave', function (event) {

    document.body.style.opacity = 1;

  }, false);

  document.addEventListener('drop', function (event) {

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

  window.addEventListener('resize', onWindowResize, false);
  /* bind touch events */
  window.addEventListener('touchstart', onTouchstart(this), false);
  window.addEventListener('touchmove', onTouchmove, false);
  window.addEventListener('touchend', onTouchend, false);
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
      var intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        if (intersects[0].object.id > 3) {
          intersects[0].object.material.map = new THREE.TextureLoader().load('http://oe9g187nt.bkt.clouddn.com/img/sprite0.png');
          intersects[0].object.scale.set(50, 50, 1);
          if ( scores[intersects[0].object.id] === false) {
            scores[intersects[0].object.id] = true;
            vm.foundCount += 1;
          }
          console.log(scores,vm.foundCount);
          if (foundAll()) {
            console.log('恭喜你已找出所有拼图');
            alert('恭喜你已找出所有拼图，请领取礼物');
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
      var deltaX = 15,
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
      var intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        if (intersects[0].object.id > 3) {
          intersects[0].object.material.map = new THREE.TextureLoader().load('http://oe9g187nt.bkt.clouddn.com/img/sprite0.png');
          intersects[0].object.scale.set(50, 50, 1);
          if (scores[intersects[0].object.id] === false) {
            scores[intersects[0].object.id] = true;
            vm.foundCount += 1;
          }
          console.log(scores,vm.foundCount);
          if (foundAll()) {
            console.log('恭喜你已找出所有拼图');
            alert('恭喜你已找出所有拼图，请领取礼物');
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

    if ( isUserInteracting === false ) {

      lon += 0.1;

    }

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
    .info
      position: absolute
      z-index: 10
      top: 10px
      left: 10px
</style>
