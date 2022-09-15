
//escenario
const scene = new THREE.Scene(); 
const textureLoader = new THREE.TextureLoader();
 const matcap = textureLoader.load('./img/gris.jpg');

{
    const near = 1;
    const far = 2;
    const color = 'white';
    scene.fog = new THREE.Fog(color, near, far);
 }

 var loader = new THREE.TextureLoader();
loader.load("./img/fondo_2.png", function(texture){
	scene.background = texture;
} );


//camara
const camera = new THREE.PerspectiveCamera( 130, window.innerWidth / window.innerHeight, 0.1, 1000 );

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//geometria
const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 );
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcap;
material.flatShanding = true;
const capsule = new THREE.Mesh( geometry, material );
scene.add( capsule );

camera.position.z = 2

// bordes

const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial ( {color: 0x000000} ) );
scene.add(line);


//animacion

function animate() {
	requestAnimationFrame( animate );
	capsule.rotation.y += 0.01;
    capsule.rotation.x += 0.02;
    capsule.rotation.z += 0.01;
    line.rotation.y += 0.01;
    line.rotation.x += 0.02;
    line.rotation.z += 0.01;

	renderer.render( scene, camera );
}
animate();
