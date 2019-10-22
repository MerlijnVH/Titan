import * as THREE from 'three';
import SceneManager from './modules/SceneManager';
import InputManager from './modules/InputManager';
import MapManager from './modules/MapManager';
import Player from './modules/Player';

const sceneManager = new SceneManager();

const inputManager = new InputManager(document);
const mapManager = new MapManager(sceneManager.scene);

let scene = sceneManager.scene;

var texture = new THREE.TextureLoader().load('assets/textures/wall0.png');
texture.magFilter = THREE.NearestFilter;
var materialWall = new THREE.MeshBasicMaterial({ map: texture });



let width = window.innerWidth;
let height = window.innerHeight;
let aspect = width / height;

let camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);



const playerSize = 1;



var velocity = new THREE.Vector3;
var prevTime = performance.now();

var speedMove = 0.15;
var speedRotate = 0.05;

var moveDir = 0;
var moveRot = 0;

// camera.position.set(mapWidth / 2, mapHeight / 2, 8);

var geometry = new THREE.PlaneGeometry(playerSize, playerSize, playerSize);
var material = new THREE.MeshLambertMaterial();
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.x = 8;
cube.position.y = 8;
cube.position.z = 0.5;

cube.add(camera);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;

            // camera.position.z = 0.75;
            camera.rotateZ(45 * (Math.PI / 2));
            // camera.rotateY(0.30);
            camera.rotateX(45 * (Math.PI / 2));
            // camera.rotateZ()

var cameraHeight = 0.75;

var render = function () {
    requestAnimationFrame(render);

    var time = performance.now();
    var delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * 6.0 * delta;
    velocity.y -= velocity.y * 4.0 * delta;

    velocity.x += inputManager.moveVector.x * speedMove * delta;
    velocity.y += inputManager.moveVector.y * speedRotate * delta;

    // var _velocity = new THREE.Vector3(velocity.x, velocity.y, velocity.z);

    // var moveSpeed = _velocity.normalize().length();
    //var moveStep = moveVector.x * speedMove * delta;
    //moveRot = moveVector.y * speedRotate * delta;
    // moveRot = moveRot % 360;

    // rotation = moveRot * Math.PI / 180;

    // var moveDir = moveVector.x * speedMove * delta;
    // moveRot += moveVector.y * speedRotate * delta;
    moveDir = velocity.x;
    moveRot = velocity.y;

    var posX = cube.position.x;
    var posY = cube.position.y;

    var angle = cube.rotation.z;

    var newX = cube.position.x + Math.cos(angle) * moveDir;
    var newY = cube.position.y + Math.sin(angle) * moveDir;

    let update = mapManager.checkCollision(posX, posY, newX, newY, 0.15);

    cube.position.set(update.x, update.y, cameraHeight);

    // cube.rotation.z = moveRot;
    cube.rotateZ(moveRot); // YES

    // camera.translateZ(velocity.z * delta);
    // camera.rotateY(velocity.y * delta);

    prevTime = time;

    renderer.render(scene, camera);
};



render();
