
let skyElementSecond;
let skyElementFirst;
let lobbySkyTransition, lobbySkyTransitionTwo, lobbySkyTransitionThree;
let redVal = 76;
let greenVal = 0;
let blueVal = 0;
let scene2El;
let lobbyEl;
//state counter 0 = lobby, francis1 = first scene, francis2 = second, etc.
var state = 0;
let floorToFadeScene1;
//scene 3
let planePos = 0;
let scene3El;
let francisTorus1Increment = 0;
let francisTorus2Increment, francisTorus3Increment;
let francis1;
let currHoverFrancis;
let scene1El;
let cursorReticle;
AFRAME.registerComponent("foo", {
  init: function() {
    francis1 = document.querySelector("#francis1");
    this.plane = document.querySelector("#planeToFollow");
    this.cam = document.querySelector("#lobbyCam");
    floorToFadeScene1 = document.querySelector("#floorToFadeScene1");
    lobbySkyTransition = document.querySelector("#lobbySky");
    lobbySkyTransitionTwo = document.querySelector("#lobbySkyTransitionTwo");
    lobbySkyTransitionThree = document.querySelector(
      "#lobbySkyTransitionThree"
    );

    lobbySkyTransition.setAttribute("visible", true);
    lobbySkyTransitionTwo.setAttribute("visible", false);
    lobbySkyTransitionThree.setAttribute("visible", false);

    lobbyEl = document.querySelector("#lobby");
    scene2El = document.querySelector("#secondPerformance");
    scene1El = document.querySelector("#firstPerformance");
    scene3El = document.querySelector("#thirdPerformance");

    skyElementSecond = document.querySelector("#scene2Sky");
    skyElementFirst = document.querySelector("#scene1Sky");
    this.plane = document.querySelector("#planeToFollow");

    scene1El.setAttribute("visible", "false");
    scene2El.setAttribute("visible", "false");
    scene3El.setAttribute("visible", "false");
  },
  tick: function(time) {
    if (state == 0) {
      //transition  to other scene is triggered once light attached to each francis reaches a certain value.
      //Initial light transitions are not triggered in this script, they are native to a-frame with the cursor object triggering the light when the hover is long enough.
      if (
        document.querySelector("#francis1").components.light.light.intensity >
        0.1
      ) {
        lobbySkyTransition.setAttribute("visible", "true");
        lobbySkyTransition.setAttribute("animation", "autoplay", true);
        if (
          document.querySelector("#francis1").components.light.light.intensity >
          5.2
        ) {
          state = 3;
          lobbyEl.setAttribute("visible", "false");
          scene1El.setAttribute("visible", "true");
          //add shape rain to scene 1
          scene1El.setAttribute("shaperain",'');
          floorToFadeScene1.setAttribute("animation", "autoplay", true);
          skyElementFirst.setAttribute("animation", "autoplay", true);
          lobbySkyTransition.setAttribute("material", "color", "rgb(0, 0, 0)");
          //moving boxes can be triggered here
        }
      }
      if (
        document.querySelector("#francis2").components.light.light.intensity >
        0.1
      ) {
        lobbySkyTransition.setAttribute("visible", "false");
        lobbySkyTransitionTwo.setAttribute("visible", "true");
        lobbySkyTransitionTwo.setAttribute("animation", "autoplay", true);
        if (
          document.querySelector("#francis2").components.light.light.intensity >
          5.2
        ) {
          state = 2;
          lobbyEl.setAttribute("visible", "false");
          scene2El.setAttribute("visible", "true");
          lobbySkyTransition.setAttribute("visible", "true");
          lobbySkyTransitionTwo.setAttribute("visible", "false");

          skyElementSecond.setAttribute("animation", "autoplay", true);
          francisTorus2Increment = 0;
        }
      }
      if (
        document.querySelector("#francis3").components.light.light.intensity >
        0.1
      ) {
        lobbySkyTransition.setAttribute("visible", "false");
        lobbySkyTransitionThree.setAttribute("visible", "true");
        lobbySkyTransitionThree.setAttribute("animation", "autoplay", true);
        if (
          document.querySelector("#francis3").components.light.light.intensity >
          5.2
        ) {
          state = 4;
          lobbySkyTransition.setAttribute("visible", "true");
          lobbySkyTransitionThree.setAttribute("visible", "false");
          lobbyEl.setAttribute("visible", "false");
          scene3El.setAttribute("visible", "true");
        }
      }
    }
    //this code below brings the lobby scene back to being active after some value is reached in each scene.
    //Scene 1: redvalue of sky becomes high
    //Scene 2: if red value becomes very low
    //Scene 3: if plane is far enough below the user.
    if (
      state == 2 &&
      skyElementSecond.components.material.material.color.r <= 0.3
    ) {
      skyElementSecond.setAttribute(
        "material",
        "color",
        `rgb(${redVal}, ${greenVal}, ${blueVal})`
      );
      if (redVal >= 1) {
        redVal -= 1;
      }
      if (redVal < 1) {
        scene2El.setAttribute("visible", false);
        lobbyEl.setAttribute("visible", true);
        state = 0;
        currHoverFrancis = null;
        this.cam.setAttribute("position", {
          x: 0,
          y: 0,
          z: 0
        });
      }
    }
    if (state == 3) {
      if (skyElementFirst.components.material.material.color.g < 0.37) {
        state = 0;
        currHoverFrancis = null;
        scene1El.setAttribute("visible", false);
        lobbyEl.setAttribute("visible", true);
        this.cam.setAttribute("position", {
          x: 0,
          y: 0,
          z: 0
        });
      }
    }
    if (state == 4) {
      if (time < 5000) {
      } else {
        planePos -= 0.02;
        console.log("planePos is: " + planePos);
        if (planePos <= -20) {
          state = 0;
          scene3El.setAttribute("visible", false);
          lobbyEl.setAttribute("visible", true);
          this.cam.setAttribute("position", {
            x: 0,
            y: 0,
            z: 0
          });
        }
      }
      let camPos = document.querySelector("#lobbyCam").object3D.position;
      this.plane.setAttribute("position", {
        x: camPos.x,
        y: planePos,
        z: camPos.z
      });
    }
  }
});


//######################################################################
// Shadow code below

/*Socket IO side */
var socket = io.connect();

var numUsers = 0;
var previousNumUsers = 0;

var requestAnimationFrame = window.requestAnimationFrame       ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame    ||
                            window.msRequestAnimationFrame; 
var time = 0;
var fps = 60; //frames per second to determine how many frames I want per second   

const socket_loop = () => {
    //use set timeout function to slowdown animation frame.
    setTimeout(function(){
        requestAnimationFrame(socket_loop);
        socket.on("clientreceiveusersconnected",(data)=>{
          console.log("Num of users connected ",numUsers);
          numUsers = data;
        })
        if (numUsers >0 && previousNumUsers<numUsers){
          for (var i=0;i<numUsers;i++){
            appendObject(i);
          }
        }
        else if(numUsers<previousNumUsers){
          removeObject(previousNumUsers)
        }
        socket.emit('usersConnected');
        previousNumUsers = numUsers;

    },1000 / fps)
    
  }

socket_loop();

function appendObject(id) {
  // https://stackoverflow.com/questions/41336889/adding-new-entities-on-the-fly-in-aframe
  let x = getRandomArbitrary(40,50);
  let y = 10;
  let z = getRandomArbitrary(40,50);
  // imporve shadow randomization below
  const position = `${getRandomArbitrary(-20,20)} ${1} ${getRandomArbitrary(-30,-20)}`;

  $('<a-plane/>', {
    id: `shadow${id}`,
    class: 'shadowsss',
    position: position,  // doesn't seem to do anything, known issue
    scale: "10 10 10",
    rotation: "0 0 0",
    material:"src: #shadow; transparent: true",
    appendTo : $('#lobby')
  });
 document.getElementById(`shadow${id}`).setAttribute("position", position); // this does set position as a workaround
}

function removeObject(objectCount){
    previousObject = document.getElementById(`shadow${objectCount - 1}`);
    previousObject.parentNode.removeChild(previousObject);
}


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
//######################################################################


//######################################################################
// Shape rain component below
var roundtripcounter = 0;
var shapes = [];
var shapepositions = {};
AFRAME.registerComponent("shaperain", {
  init: function() {
  console.log('shape-rainnnjnnnnnnn');
  this.shapesreference = []
  let countX = 10;
  // this.shapes = [];
  let size = 0.2, spacing = 1, x;
  let sceneEl = document.querySelector("#firstPerformance");
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
    y = Math.random() * 0.9 + 1.5;
    const position = `${x} ${y} ${0}`;
    const position_dictionary = {
      x:x,
      y:y,
      z:0
    }
    console.log("intended pos of shape",position);
    shapes[i].setAttribute("position",position);
    shapepositions['box_'+i.toString()] = position_dictionary;
    
    
    // you can add event listeners here for interaction, such as mouse events.
    sceneEl.appendChild(shapes[i]);// Append the element to the scene, so it becomes part of the DOM.

    // set position of the shape once its in the DOM as a workaround
    const shape_from_DOM = document.getElementById('box_'+i.toString());
    console.log("Shape from DOM old pos: \n",shape_from_DOM);
    shape_from_DOM.setAttribute("position",position);
    console.log("Shape from DOM new pos: \n",shape_from_DOM);
  }
  // If you want to access THREEjs properties, you need to access them after they have loaded into the scene.
  // Get the shapes as THREEjs object
  // shapePosArr = [];
  // this.shapes.forEach(function(c){
  //   c.addEventListener('loaded', function(ev){
  //     let shape3D = c.getObject3D('mesh');
  //     //console.log(shape3D);
  //     this.shapesreference.push(shape3D);
  //   });
  // });
  },
  tick: function() {
    shapes.forEach(function(shape){
      // if (roundtripcounter > 30){
      //   window.location.href = '/lobby';
      // }
      let shapePos = shape.getAttribute('position');
      let shape_id = shape.getAttribute('id')
      if (roundtripcounter === 0){
        console.log(shapes);
        console.log("Shape pos in tick function");
        console.log(shapePos);
        console.log(shape.getAttribute('id'));
        console.log(shapepositions)

      }
      roundtripcounter+=1;

      let xPos = shapepositions[shape_id]['x'];
      let yPos = shapepositions[shape_id]['y'];
      let zPos = shapePos['z'] + 0.01;
      
      if (zPos > 9){
        zPos = -1; 
        shape.setAttribute('color',getRandomColor())
      }
      shape.setAttribute('position',xPos.toString()+ ' '+yPos.toString() +' '+ zPos.toString())
    })
    
    // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
  }
});

//https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//######################################################################