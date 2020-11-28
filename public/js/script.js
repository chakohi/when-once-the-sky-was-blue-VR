console.log(THREE);
AFRAME.registerComponent("foo", {
  init: function() {
    this.box = document.querySelector("a-box");
    document.getElementById("firstPerformance").setAttribute("visible", "true");
    document
      .getElementById("secondPerformance")
      .setAttribute("visible", "false");
  },
  tick: function() {
    this.box.setAttribute("material", "color", "red");
    // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
  }
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 000000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const animate = function() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
/*
    
Tutorial Resources:
For player movement: 
https://www.youtube.com/watch?v=VdnN5nuxj-s
https://github.com/saucecode/threejs-demos/blob/master/02_FloorAndMovement/demo.js 
https://dev.to/codypearce/how-to-create-a-skybox-with-three-js-2bn8
https://dev.to/codypearce/how-to-create-a-skybox-with-three-js-2bn8









*/
