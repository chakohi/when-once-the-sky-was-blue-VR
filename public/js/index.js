// console.log(THREE);
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