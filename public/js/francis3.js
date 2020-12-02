console.log("third scene aka francis 3");
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