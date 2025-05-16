import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';

// Cena
const scene = new THREE.Scene();

// Câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 3);

// Renderizador
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('meuCanvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;

// Luzes
const light = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Carregar modelo GLTF
const loader = new GLTFLoader();
loader.load(
  'modelo/meu_modelo.glb',
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Ajustar em tempo real
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Loop de animação
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
