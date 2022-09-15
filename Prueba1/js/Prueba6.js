const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const matcap = textureLoader.load('./img/café.jpg'); 

var loader = new THREE.TextureLoader();
loader.load("./img/Fondo_4.jpg", function(texture){
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

const geometry = new THREE.ConeGeometry( 5, 20, 32 );
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcap;
material.flatShanding = true;
const cone = new THREE.Mesh( geometry, material );
scene.add( cone );


camera.position.z = 30; 
camera.position.x = 2;

//bordes

const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add( line );

//animación
function animate() {
   requestAnimationFrame( animate );
   cone.rotation.y += 0.1;
   cone.rotation.z += 0.1;

   line.rotation.y += 0.1;
   line.rotation.z += 0.1;
   renderer.render (scene, camera);
}
animate();