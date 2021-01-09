let skyElementSecond;
let skyElementFirst;

let redVal = 76;
let greenVal = 0;
let blueVal = 0;
let scene2El;
let lobbyEl;
let cameraLobby;
let cameraTwo, cameraOne;
//state counter 0 = lobby, francis1 = first scene, francis2 = second, etc.
var state = 0;
let floorToFadeScene1;
//scene 3
let planePos = 0;
let scene3Cam;
let scene3El;

let scene1El;
AFRAME.registerComponent("foo", {
  init: function() {
    // this.box = document.querySelector("a-box");
    this.plane = document.querySelector("#planeToFollow");
    this.cam = document.querySelector("#lobbyCam");
    floorToFadeScene1 = document.querySelector("#floorToFadeScene1");
    // cameraLobby = document.querySelector("#lobbyCam");
    // cameraOne = document.querySelector("#cameraOne");
    // cameraTwo = document.querySelector("#cameraTwo");
    // cameraThree = document.querySelector("#cameraThree");
    // cameraThree.setAttribute("camera", "active: false");
    // cameraTwo.setAttribute("camera", "active: false");
    // cameraOne.setAttribute("camera", "active: false");
    // cameraLobby.setAttribute("camera", "active: true");

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
    // scene1El.addEventListener("loaded", function() {
    // scene1El.pause();
    console.log(skyElementFirst.components.animate);
    this.el.addEventListener("hitstart", e => {
      console.log(
        e.target.id,
        "collided with",
        e.target.components["aabb-collider"]["intersectedEls"].map(x => x.id)
      );
      var collidedwithid =
        e.target.components["aabb-collider"]["intersectedEls"][1].id;
      console.log("collidedwithid", collidedwithid);
      if (collidedwithid == "francis2") {
        state = 2;
        lobbyEl.setAttribute("visible", "false");
        scene2El.setAttribute("visible", "true");
        skyElementSecond.setAttribute("animation", "autoplay", true);
      } else if (collidedwithid == "francis1") {
        state = 3;
        lobbyEl.setAttribute("visible", "false");
        scene1El.setAttribute("visible", "true");
        // window.location.href = 'francis1.html';
        floorToFadeScene1.setAttribute("animation", "autoplay", true);
        skyElementFirst.setAttribute("animation", "autoplay", true);
      } else if (collidedwithid == "francis3") {
        state = 4;
        lobbyEl.setAttribute("visible", "false");
        scene3El.setAttribute("visible", "true");
      }
    });
  },
  tick: function(time) {
    if (
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
        state = 0;
        window.location.href =  "/lobby";

        this.cam.setAttribute("position", {
          x: 0,
          y: 1,
          z: 0
        });
      }
    }
    if (state == 3) {
      console.log(
        "in state 3: " + skyElementFirst.components.material.material.color.g
      );
      if (skyElementFirst.components.material.material.color.g < 0.37) {
        console.log("decrementing");
        state = 0;
        scene1El.setAttribute("visible", false);
        lobbyEl.setAttribute("visible", true);
        this.cam.setAttribute("position", {
          x: 0,
          y: 1,
          z: 0
        });
      }
    }
    if (state == 4) {
      if (time < 5000) {
      } else {
        planePos -= 0.02;
        console.log("planePos is: " + planePos);
        if (planePos <= -30) {
          state = 0;
          scene3El.setAttribute("visible", false);
          lobbyEl.setAttribute("visible", true);
          this.cam.setAttribute("position", {
            x: 0,
            y: 1,
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


/*Socket IO side */
var socket = io.connect();

var numUsers = 0;

socket.on('usersConnected', function(data){
  console.log("Num of users connected ",data);
  numUsers = data;
})