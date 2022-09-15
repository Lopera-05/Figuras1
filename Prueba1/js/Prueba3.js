
//escenario
 const scene = new THREE.Scene(); 
 const textureLoader = new THREE.TextureLoader();
 const matcap = textureLoader.load('./img/agua.jpg');

scene.background = new THREE.Color(0xe50090) 

 var loader = new THREE.TextureLoader();
loader.load("./img/fodito.jpg", function(texture){
scene.background = texture;
} );

//camara
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//geometria

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcap;
material.flatShanding = true;
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

camera.position.z = 30; 
camera.position.y = 2;



//bordes

const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add( line );

//animación
function animate() {
	requestAnimationFrame( animate );
	torus.rotation.y += 0.02;
	torus.rotation.z += 1;

	line.rotation.y += 0.02;
	line.rotation.z += 1;
	renderer.render( scene, camera );
}
animate();
