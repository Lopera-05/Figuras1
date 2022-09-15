//escenario
const scene = new THREE.Scene(); 
const textureLoader = new THREE.TextureLoader();
const matcap = textureLoader.load('./img/papel.jpg');

scene.background = new THREE.Color(0xa349)

var loader = new THREE.TextureLoader();
loader.load("./img/fondo.jpg", function(texture){
	scene.background = texture;
} );

//camara
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
// el primer numero es profundidad
//innerWith y innerheight controla en alto y el ancho
// 0.1 legania 
// 1000 acercanía

//render
const renderer = new THREE.WebGLRenderer();
// WebGL permite dibujar y crear en la web
// renderizar es transformar el archivo en algo visible en otros dispositivos 
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//esto se guarda en renderer

//geometria
const geometry = new THREE.BoxGeometry(1,1,1); // se crea la figura 
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcap;
material.flatShanding = true;
 //puedo utilizar colores, texturas
const cube1 = new THREE.Mesh (geometry, material); // para que aparezca en la pantalla 
scene.add(cube1);


camera.position.z = 2;  // controla las posiciones de la figura 
camera.position.y = 0.1;
camera.position.x = -0.1;


const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial ({color: 0x55555})
)
cube2.position.x = 2;

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial ({color: 0x000ff})
)
cube3.position.x = -2;


//bordes
const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xfffff } ) );
scene.add( line);
scene.add(cube1, cube2, cube3);

let objects = [ cube1, cube2, cube3, line]

const control = new THREE.DragControls(objects, camera, renderer.domElement);

const dControls = new THREE.DragControls (objects, camera, renderer.domElement);
dControls.deactivate();
dControls.activate();

dControls.addEventListener("hoveron", function(event){
	event.object.material.wireframe = true;
	event.object.scale.y *=4;
});

dControls.addEventListener("hoveroff", function(event){
	event.object.material.wireframe = false;
	event.object.scale.y /=4;
});

const flyControls = new THREE.FlyControls (camera, renderer.domElement);
flyControls.movementSpeed =50;
flyControls.rollSpeed =0.01;
flyControls.autoForward =false;
flyControls.dragToLock =false;
/* dcontrols.addEventListener("dragstart", function (event){
	console.log (event.object.material);
	event.object.material.opacity = 0.5;
});

dcontrols.addEventListener("dragstart", function (event){
	event.object.material.opacity = 1.0;
}); */


//ORBIT CONTROLS

/* var control = new THREE.OrbitControls (camera, renderer.domElement);
control.minDistance = 3;
control.maxDistance = 10; */

//pointerLockControls

// const PointerLockControls = new THREE.PointerLockControls (camera, renderer.domElement);
// document.getElementById('btnplay').onclick = () => {
// 	PointerLockControls.lock();
// };

//animación
function animate() {
	requestAnimationFrame( animate );
	cube1.rotation.y += 0.01;   // controla la rotacion de la figura y la rapidez
	cube2.rotation.y += 0.01;
	cube3.rotation.y += 0.01; 
	// Se llama asi misma la animacón
	renderer.render( scene, camera );
	// Se renderiza la scene y la camara 

    line.rotation.y += 0.01;  
	flyControls.update(0.5)
	
	

}
animate();