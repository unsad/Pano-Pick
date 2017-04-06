<template>
  <div class="root">
    <div v-if="!over" id="container"></div>
    <div class="info">
      <div v-if="!over">剩余时间: {{time}}s</div>
      <div v-if="over">
        恭喜你找到{{foundCount}}个拼图，获得{{money}}牛币
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
        time: 60,
        over: false,
        foundCount: 0
      }
    },
    computed: {
      money() {
        switch (true) {
          case this.foundCount === 1:
            return 1;
          case this.foundCount <= 5:
            return 10;
          default:
            return 20;
        }
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
  let camera, scene, renderer;

  let isUserInteracting = false,
    onPointerDownPointerX = 0, onPointerDownPointerY = 0,
    lon = 0, onPointerDownLon = 0,
    lat = 0, onPointerDownLat = 0,
    phi = 0, theta = 0,
    startDistance = 0;

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
      map: new THREE.TextureLoader().load('http://oe9g187nt.bkt.clouddn.com/img/2294472375_24a3b8ef46_o.jpg')
    });

    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
    /* add the spirits here */

    function createSprite() {
      let spriteMaterial = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load('http://oe9g187nt.bkt.clouddn.com/img/sprite1.png'),
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
      console.log(sprite.position);
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
  container.addEventListener('touchmove', onTouchmove, false);
  container.addEventListener('touchend', onTouchend, false);
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
        if (intersects[0].object.id > 3) {
          intersects[0].object.material.map = new THREE.TextureLoader().load('http://oe9g187nt.bkt.clouddn.com/img/sprite0.png');
          intersects[0].object.scale.set(20, 20, 1);
          if ( scores[intersects[0].object.id] === false) {
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
        if (intersects[0].object.id > 3) {
          intersects[0].object.material.map = new THREE.TextureLoader().load('http://oe9g187nt.bkt.clouddn.com/img/sprite0.png');
          intersects[0].object.scale.set(20, 20, 1);
          if (scores[intersects[0].object.id] === false) {
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
    .info
      position: absolute
      z-index: 10
      top: 10px
      left: 10px
</style>
