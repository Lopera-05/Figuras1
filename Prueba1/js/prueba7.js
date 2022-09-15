const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const matcap = textureLoader.load('./img/metalizado.jpg'); 

var loader = new THREE.TextureLoader();
loader.load("./img/hojita.jpg", function(texture){
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

class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {

		super();

		this.scale = scale;

	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

	}

}

const path = new CustomSinCurve( 10 );
const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcap;
material.flatShanding = true;
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

camera.position.z = 30; 
camera.position.x = 2;

//bordes

const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffff0 } ) );
scene.add( line );

//animación
function animate() {
   requestAnimationFrame( animate );
   mesh.rotation.y += 0.01;
   mesh.rotation.z += 0.01;

   line.rotation.y += 0.01;
   line.rotation.z += 0.01;
   renderer.render (scene, camera);
}
animate();