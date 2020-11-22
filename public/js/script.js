
console.log("hiii");
console.log(document.querySelector('a-entity'));

AFRAME.registerComponent("calcdistance", {
    init: function() {
        this.cam = document.querySelector("a-camera")
        this.sphere = document.querySelector("a-sphere")
    },
    tick: function() {
        // console.log(this.sphere);
        // console.log(this.cam);
        console.log('ruuuun');
        let camPos = this.cam.object3D.position
        let spherePos = this.sphere.object3D.position
        let distance = camPos.distanceTo(spherePos)
        console.log(distance);
        if (distance < 6) {
            // camera closer than 5m, do something
            console.log("AAAAH change scene");
        }
    }
  })





/*
Useful Reosurces: 
https://jsfiddle.net/jng091qx/
https://aframe.io/docs/1.0.0/introduction/best-practices.html




*/
