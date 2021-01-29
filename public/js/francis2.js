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
let francis1Torus, francis2Torus, francis3Torus;
let francisTorus1Increment = 0;
let francisTorus2Increment, francisTorus3Increment;
let francis1;
let currHoverFrancis;
let scene1El;
let cursorReticle;
AFRAME.registerComponent("foo", {
  init: function() {
    // cursorReticle = document.querySelector("#cursorReticle");
    // this.box = document.querySelector("a-box");
    francis1 = document.querySelector("#francis1");
    this.plane = document.querySelector("#planeToFollow");
    this.cam = document.querySelector("#lobbyCam");
    floorToFadeScene1 = document.querySelector("#floorToFadeScene1");
    francis1Torus = document.querySelector("#francis1Light");
    francis2Torus = document.querySelector("#francis2Light");
    lobbySkyTransition = document.querySelector("#lobbySky");
    lobbySkyTransitionTwo = document.querySelector("#lobbySkyTransitionTwo");
    lobbySkyTransitionThree = document.querySelector(
      "#lobbySkyTransitionThree"
    );

    lobbySkyTransition.setAttribute("visible", true);
    lobbySkyTransitionTwo.setAttribute("visible", false);
    lobbySkyTransitionThree.setAttribute("visible", false);

    document
      .querySelector("#raycastCube")
      .setAttribute("material", "opacity", "0");
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

    //   this.el.addEventListener("hitstart", e => {
    //     console.log(
    //       e.target.id,
    //       "collided with",
    //       e.target.components["aabb-collider"]["intersectedEls"].map(x => x.id)
    //     );
    //     var collidedwithid =
    //       e.target.components["aabb-collider"]["intersectedEls"][1].id;
    //     if (collidedwithid == "francis1") {
    //       francisTorus1Increment++;
    //       console.log(francisTorus1Increment);
    //       if (francisTorus1Increment == 360) {
    //         state = 3;
    //         lobbyEl.setAttribute("visible", "false");
    //         scene1El.setAttribute("visible", "true");
    //         // window.location.href = 'francis1.html';
    //         floorToFadeScene1.setAttribute("animation", "autoplay", true);
    //         skyElementFirst.setAttribute("animation", "autoplay", true);
    //       }
    //     } else if (collidedwithid == "francis2") {
    //       state = 2;
    //       lobbyEl.setAttribute("visible", "false");
    //       scene2El.setAttribute("visible", "true");
    //       skyElementSecond.setAttribute("animation", "autoplay", true);
    //     } else if (collidedwithid == "francis3") {
    //       state = 4;
    //       lobbyEl.setAttribute("visible", "false");
    //       scene3El.setAttribute("visible", "true");
    //     }
    //   });
  },
  tick: function(time) {
    // console.log(currHoverFrancis);
    if (state == 0) {
      if (
        document.querySelector("#francis1").components.light.light.intensity >
        0.1
      ) {
        console.log("should be shining!");
        lobbySkyTransition.setAttribute("visible", "true");
        lobbySkyTransition.setAttribute("animation", "autoplay", true);
        if (
          document.querySelector("#francis1").components.light.light.intensity >
          5.2
        ) {
          console.log("really intense!");
          state = 3;
          lobbyEl.setAttribute("visible", "false");
          scene1El.setAttribute("visible", "true");
          floorToFadeScene1.setAttribute("animation", "autoplay", true);
          skyElementFirst.setAttribute("animation", "autoplay", true);
          lobbySkyTransition.setAttribute("material", "color", "rgb(0, 0, 0)");
        }
      }
      if (
        document.querySelector("#francis2").components.light.light.intensity >
        0.1
      ) {
        console.log("should be shining!");
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
        console.log("should be shining!");
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
      if (currHoverFrancis == "francis1") {
        if (
          document.querySelector("#francis1").components.light.light.intensity >
          0.1
        ) {
          console.log("should be shining!");
          lobbySky.setAttribute("animation", "autoplay", true);
          if (
            document.querySelector("#francis1").components.light.light
              .intensity > 4.9
          ) {
            console.log("really intense!");
            state = 3;
            lobbyEl.setAttribute("visible", "false");
            scene1El.setAttribute("visible", "true");
            floorToFadeScene1.setAttribute("animation", "autoplay", true);
            skyElementFirst.setAttribute("animation", "autoplay", true);
          }
        }
        // if (cursorReticle.components.material.material.opacity == 1) {
        //   console.log("begin transition!");
        // }
        // console.log(
        //   "thate length is: " +
        //     cursorReticle.components.material.material.height
        // );

        // if (
        //   document.querySelector("#francis1LightTwo").components.light.light
        //     .intensity > 5.8
        // ) {
        //   console.log("really intense!");
        //   state = 3;
        //   lobbyEl.setAttribute("visible", "false");
        //   scene1El.setAttribute("visible", "true");
        //   floorToFadeScene1.setAttribute("animation", "autoplay", true);
        //   skyElementFirst.setAttribute("animation", "autoplay", true);
        // }
        // if (time % 2 == 0) {
        //   francis1Torus.setAttribute("intensity", francisTorus1Increment);
        //   francisTorus1Increment += 0.1;
        // }
        // setTimeout(function() {
        //   francis1Torus.setAttribute("visible", true);
        // }, 200);
        // if (francisTorus1Increment >= 390) {
        //   francis1Torus.setAttribute("visible", false);
        //   state = 3;
        //   lobbyEl.setAttribute("visible", "false");
        //   scene1El.setAttribute("visible", "true");
        //   floorToFadeScene1.setAttribute("animation", "autoplay", true);
        //   skyElementFirst.setAttribute("animation", "autoplay", true);
        //   francisTorus1Increment = 0;
        // }
      } else if (currHoverFrancis == "francis2") {
        if (
          document.querySelector("#francis2LightTwo").components.light.light
            .intensity > 4.9
        ) {
          state = 2;
          lobbyEl.setAttribute("visible", "false");
          scene2El.setAttribute("visible", "true");
          skyElementSecond.setAttribute("animation", "autoplay", true);
          francisTorus2Increment = 0;
        }
      } else if (currHoverFrancis == "francis3") {
        if (
          document.querySelector("#francis3LightTwo").components.light.light
            .intensity > 4.9
        ) {
          state = 4;
          lobbyEl.setAttribute("visible", "false");
          scene3El.setAttribute("visible", "true");
        }
        // francis1Torus.setAttribute("visible", false);
        // francis2Torus.setAttribute("visible", false);
        // francis3Torus.setAttribute("visible", false);

        // francisTorus1Increment = 0;
        // francisTorus2Increment = 0;
        // francisTorus3Increment = 0;
      }
    }
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
        state = 0;
        currHoverFrancis = null;
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
// AFRAME.registerComponent("francis1mouseenter", {
//   init: function() {
//     this.el.addEventListener("click", function(evt) {
//       currHoverFrancis = "francis1";
//     });
//     this.el.addEventListener("mouseleave", function(evt) {
//       currHoverFrancis = null;
//     });
//   }
// });

// AFRAME.registerComponent("francis2mouseenter", {
//   init: function() {
//     this.el.addEventListener("click", function(evt) {
//       currHoverFrancis = "francis2";
//       console.log("in francis2");
//     });
//     this.el.addEventListener("mouseleave", function(evt) {
//       currHoverFrancis = null;
//     });
//   }
// });

// AFRAME.registerComponent("francis3mouseenter", {
//   init: function() {
//     this.el.addEventListener("click", function(evt) {
//       console.log("hellooo3");
//     });
//     this.el.addEventListener("mouseleave", function(evt) {
//       console.log("byeee3");
//     });
//   }
// });
// AFRAME.registerComponent("raycastscript", {
//   // dependencies: ["raycaster"],
//   init: function() {
//     // this.el.addEventListener("raycaster-intersected", function(evt) {
//     //   this.raycastID = evt.srcElement.id;
//     //   currHoverFrancis = evt.srcElement.id;
//     // });
//     // this.el.addEventListener("raycaster-intersected-cleared", function(evt) {
//     //   console.log("left the object");
//     //   currHoverFrancis = null;
//     //   francis1Torus.setAttribute("visible", false);
//     //   francisTorus1Increment = 0;
//     //   francis1Torus.setAttribute("arc", `${francisTorus1Increment}`);
//     // });
//     this.el.addEventListener("hitstart", e => {
//       console.log(
//         e.target.id,
//         "collided with",
//         e.target.components["aabb-collider"]["intersectedEls"].map(x => x.id)
//       );
//       var collidedwithid =
//         e.target.components["aabb-collider"]["intersectedEls"][2].id;
//       console.log(collidedwithid);
//       if (collidedwithid == "francis1") {
//         // document
//         //   .querySelector("#francis1LightTwo")
//         //   .setAttribute("animation", "autoplay", true);
//         // cursorReticle.setAttribute("material", "opacity", "1");
//         currHoverFrancis = "francis1";
//       } else if (collidedwithid == "francis2") {
//         document
//           .querySelector("#francis2LightTwo")
//           .setAttribute("animation", "autoplay", true);
//         currHoverFrancis = "francis2";
//       } else if (collidedwithid == "francis3") {
//         document
//           .querySelector("#francis3LightTwo")
//           .setAttribute("animation", "autoplay", true);
//         currHoverFrancis = "francis3";
//       }
//     });
//   },
//   tick: function(time) {
//     // console.log(cursorReticle.components.material.material.opacity);
//     if (time) {
//       let translatedPos = document
//         .querySelector("#lobbyCam")
//         .object3D.getWorldDirection();
//       // console.log(new_pos);
//       document.querySelector("#raycastCube").setAttribute("position", {
//         x:
//           document.querySelector("#lobbyCam").object3D.position.x +
//           -translatedPos.x * 2.5,
//         y:
//           document.querySelector("#lobbyCam").object3D.position.y +
//           0.7 +
//           -translatedPos.y * 1.5,
//         z:
//           document.querySelector("#lobbyCam").object3D.position.z +
//           -translatedPos.z * 2.5
//       });
//     }
//   }
// });
