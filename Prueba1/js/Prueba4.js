
//escenario
 const scene = new THREE.Scene();
 {
    const near = 40;
    const far = 5;
    const color = 'red';
    scene.fog = new THREE.Fog(color, near, far);
 } 
 const textureLoader = new THREE.TextureLoader();
 const matcap = textureLoader.load('./img/ladrillo.jpg');


var loader = new THREE.TextureLoader();
loader.load("./img/fondo_3.jpg", function(texture){
	scene.background = texture;
} );


//camara
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//geometria
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcap;
material.flatShanding = true;
const torusKnot = new THREE.Mesh( geometry, material );
scene.add( torusKnot );

camera.position.z= 40
camera.position.y = 5

//bordes 
const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add( line );


//animación
function animate() {
	requestAnimationFrame( animate );
	torusKnot.rotation.y += 0.01;   // controla la rotacion de la figura y la rapidez
	torusKnot.rotation.x += 0.01;
	torusKnot.rotation.z += 0.01;
	renderer.render( scene, camera );

	line.rotation.y += 0.01;   
	line.rotation.x += 0.01;
	line.rotation.z += 0.01;
	renderer.render( scene, camera );

	
}
animate();
