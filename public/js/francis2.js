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
