import * as THREE from 'three';
import SceneManager from './modules/SceneManager';
import InputManager from './modules/InputManager';
import MapManager from './modules/MapManager';
import Player from './modules/Player';

const sceneManager = new SceneManager();
const inputManager = new InputManager(document);
const mapManager = new MapManager(sceneManager.scene);

const clock = new THREE.Clock();
let delta = 0;

let scene = sceneManager.scene;

var texture = new THREE.TextureLoader().load('assets/textures/wall0.png');
texture.magFilter = THREE.NearestFilter;
var materialWall = new THREE.MeshBasicMaterial({ map: texture });

let width = window.innerWidth;
let height = window.innerHeight;
let aspect = width / height;

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;

camera.rotateZ(45 * (Math.PI / 2));
camera.rotateX(45 * (Math.PI / 2));

const player = new Player('Player', 8, 8, sceneManager.scene, camera, inputManager, mapManager);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

function render() {
    requestAnimationFrame(render);

    delta = clock.getDelta();

    player.update(delta);

    renderer.render(scene, camera);
}

render();
