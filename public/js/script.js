console.log("hiii");

AFRAME.registerComponent("foo", {
  init: function() {
    this.box = document.querySelector("a-box");
    // this.rockyTerrain = document.getElementById("rockyTerrain");
  },
  tick: function() {
    console.log(this.box.object3D.position);
    this.box.setAttribute("material", "color", "red");
    // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
  }
});

/*
    
Tutorial Resources:
For player movement: 
https://www.youtube.com/watch?v=VdnN5nuxj-s
https://github.com/saucecode/threejs-demos/blob/master/02_FloorAndMovement/demo.js 
https://dev.to/codypearce/how-to-create-a-skybox-with-three-js-2bn8
https://dev.to/codypearce/how-to-create-a-skybox-with-three-js-2bn8









*/
