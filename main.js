import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.getElementById("webgl");
// Cursor Movement

const cursor = {
	x: 0,
	y: 0,
};

window.addEventListener("mousemove", (e) => {
	cursor.x = -(e.clientX / sizes.width - 0.5);
	cursor.y = e.clientY / sizes.height - 0.5;
});

// Creating a Scene
const scene = new THREE.Scene();

// Creating Geometry, Material and Mesh

// const geometry = new THREE.BoxGeometry(1, 1, 1);
const geometry = new THREE.TorusKnotGeometry(1, 0.2, 76, 12,16,11);
const material = new THREE.MeshBasicMaterial({ color: "#12BD21", wireframe: true });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Creating size for the disply
const sizes = {
	width: innerWidth,
	height: innerHeight,
};

// Resizing

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update Camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update Rendere
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});

// Creating Camera and Rendering it
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

const tick = () => {
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3 ;
	// camera.position.z = Math.cos(cursor.x *Math.PI * 2) * 3;
	// camera.position.y = cursor.y * 3;
	// camera.lookAt(mesh.position);
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.01;
	mesh.rotation.z += 0.01;
	controls.update();

	// Render continously

	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};

tick();