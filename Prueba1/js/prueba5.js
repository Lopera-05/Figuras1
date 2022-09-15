const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const matcap = textureLoader.load('./img/madera.jpg'); 

var loader = new THREE.TextureLoader();
loader.load("./img/fondo_1.png", function(texture){
	scene.background = texture;
} );

//camara
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//geometria
const points = [];
for ( let i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
const geometry = new THREE.LatheGeometry( points );
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcap;
material.flatShanding = true;
const lathe = new THREE.Mesh( geometry, material );
scene.add( lathe );

camera.position.z = 30; 
//camera.position.y = 2;

//bordes

const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
scene.add( line );

//animación
function animate() {
   requestAnimationFrame( animate );
   lathe.rotation.x += 0.01;
   lathe.rotation.y += 0.01;
   lathe.rotation.z += 0.01;
  
   line.rotation.x += 0.01;
   line.rotation.y += 0.01;
   line.rotation.z += 0.01;
   renderer.render( scene, camera );
}
animate();