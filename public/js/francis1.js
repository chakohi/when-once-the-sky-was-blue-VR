
console.log("First scene aka francis 1")
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


// https://stackoverflow.com/questions/57984966/a-frame-random-generator
var shapes = [];

var shapesreference = [];

AFRAME.registerComponent("shaperain", {
  init: function() {
  //console.log('shape-man');
  let countX = 10;
  let shapes = [];
  let size = 0.125, spacing = 0.05, x;
  let sceneEl = document.querySelector('a-scene');
  for (let i=0; i<countX; i++){
    shapes[i] = document.createElement('a-entity'); // create the element
      // create components, id, geometry, position
    shapes[i].setAttribute('id', 'box_'+i.toString());
    shapes[i].setAttribute('geometry', {
      primitive: 'box',
      height: size,
      width: size,
      depth: size
    });
    x = (size + spacing) * countX * (-0.5) + i * (size + spacing) ;
    y = Math.random() * 0.25;
    shapes[i].setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );
    
    // you can add event listeners here for interaction, such as mouse events.
    sceneEl.appendChild(shapes[i]);// Append the element to the scene, so it becomes part of the DOM.
  }
  // If you want to access THREEjs properties, you need to access them after they have loaded into the scene.
  // Get the shapes as THREEjs object
  // shapePosArr = [];
  shapes.forEach(function(c){
    c.addEventListener('loaded', function(ev){
      let shape3D = c.getObject3D('mesh');
      //console.log(shape3D);
      shapesreference.push(shape3D);
    });
  });
  },
  tick: function() {
    console.log("raaain");
    console.log(shapesreference)
    shapesreference.forEach(function(shape){
      console.log(shape)
      let x = shape.position.x
      let y = shape.position.y +1;
      // shape.setAttribute('position', x.toString()+ ' '+y.toString()+' 0' );



    })
    
    // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
  }
});