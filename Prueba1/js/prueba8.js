const scene = new THREE.Scene();

var loader = new THREE.TextureLoader();
loader.load("./img/Mármol.jpg", function(texture){
	scene.background = texture;
} );

scene.background = new THREE.Color(0xe50090) 


//camara
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//geometria

const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshNormalMaterial();
material.flatShading = true;
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );


camera.position.z = 30; 
camera.position.x = 2;

//bordes

const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add( line );

//animación
function animate() {
   requestAnimationFrame( animate );
   sphere.rotation.y += 0.01;
   sphere.rotation.x += 0.01;

   line.rotation.y += 0.01;
   line.rotation.x += 0.01;
   renderer.render (scene, camera);
}
animate();