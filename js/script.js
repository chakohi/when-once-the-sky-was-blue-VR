
var scene, camera, renderer, mesh,skyboxGeo, skybox,controls;
var meshFloor;

var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;

let skyboxImage = 'afterrain';

function createPathStrings(filename) {
    const basePath = `https://raw.githubusercontent.com/codypearce/some-skyboxes/master/skyboxes/${filename}/`;
    const baseFilename = basePath + filename;
    const fileType = filename == 'purplenebula' ? '.png' : '.jpg';
    const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lf'];
    const pathStings = sides.map(side => {
      return baseFilename + '_' + side + fileType;
    });
  
    return pathStings;
  }
  
function createMaterialArray(filename) {
const skyboxImagepaths = createPathStrings(filename);
const materialArray = skyboxImagepaths.map(image => {
    let texture = new THREE.TextureLoader().load(image);

    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
});
return materialArray;
}
  

function init(){
	scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        45,
        30000,
      );
    camera.position.set(1200, -250, 2000);
	
	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshBasicMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	);
	mesh.position.set(1200, -250, 200); // Move the mesh up 1 meter
	scene.add(mesh);
	
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(10,10, 10,10),
		new THREE.MeshBasicMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
	);
	meshFloor.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees
	scene.add(meshFloor);
	
	camera.position.set(0, player.height, -5);
	camera.lookAt(new THREE.Vector3(0,player.height,0));
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);
    document.body.appendChild(renderer.domElement);

    const materialArray = createMaterialArray(skyboxImage);

    

    skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    skybox = new THREE.Mesh(skyboxGeo, materialArray);
    console.log(skybox)
  
    scene.add(skybox);
  
	
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
    
    playerMovementsHandler();
	

	renderer.render(scene, camera);
}

function playerMovementsHandler(){
    	// Keyboard movement inputs
	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		// Redirect motion by 90 degrees
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}
	
	// Keyboard turn inputs
    //Rotate Left
	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
    //RotateRight
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}
    //RotateUp
    if(keyboard[38]){
        camera.rotation.x +=player.turnSpeed;
    }
	//RotateDown
    if(keyboard[40]){
        camera.rotation.x -=player.turnSpeed;
    }
	

}

function keyDown(event){
    console.log(event.keyCode);
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;






/*
    
Tutorial Resources:
For player movement: 
https://www.youtube.com/watch?v=VdnN5nuxj-s
https://github.com/saucecode/threejs-demos/blob/master/02_FloorAndMovement/demo.js 
https://dev.to/codypearce/how-to-create-a-skybox-with-three-js-2bn8
https://dev.to/codypearce/how-to-create-a-skybox-with-three-js-2bn8









*/
