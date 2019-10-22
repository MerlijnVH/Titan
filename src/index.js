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

    // if (moveForward) velocity.z -= speedMove * delta;
    // if (moveBack) velocity.z += speedMove * delta;
    // if (moveLeft) velocity.y += speedRotate * delta;
    // if (moveRight) velocity.y -= speedRotate * delta;

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

    // let update = checkCollision(posX, posY, newX, newY, 0.15);

    // cube.position.set(update.x, update.y, cameraHeight);

    // cube.rotation.z = moveRot;
    cube.rotateZ(moveRot); // YES

    // camera.translateZ(velocity.z * delta);
    // camera.rotateY(velocity.y * delta);

    prevTime = time;

    renderer.render(scene, camera);
};

var checkCollision = function (fromX, fromY, toX, toY, radius) {
    // var pos = new THREE.Vector3(fromX, fromY, 0);

    // if (toY < 0 || toY >= mapHeight || toX < 0 || toX >= mapWidth)
    //     return pos;

    // var blockX = Math.floor(toX);
    // var blockY = Math.floor(toY);

    // if (isBlocking(blockX, blockY)) {
    //     return pos;
    // }

    // pos.x = toX;
    // pos.y = toY;

    // var blockTop = isBlocking(blockX, blockY - 1);
    // var blockBottom = isBlocking(blockX, blockY + 1);
    // var blockLeft = isBlocking(blockX - 1, blockY);
    // var blockRight = isBlocking(blockX + 1, blockY);

    // if (blockLeft != 0 && toX - blockX < radius) {
    //     toX = pos.x = blockX + radius;
    // }
    // if (blockRight != 0 && blockX + 1 - toX < radius) {
    //     toX = pos.x = blockX + 1 - radius;
    // }
    // if (blockTop != 0 && toY - blockY < radius) {
    //     toY = pos.y = blockY + radius;
    // }
    // if (blockBottom != 0 && blockY + 1 - toY < radius) {
    //     toY = pos.y = blockY + 1 - radius;
    // }

    //     // is tile to the bottom-left a wall
    //     if (isBlocking(blockX - 1, blockY + 1) != 0 && !(blockBottom != 0 && blockBottom != 0)) {
    //         var dx = toX - blockX;
    //         var dy = toY - (blockY + 1);
    //         if (dx * dx + dy * dy < radius * radius) {
    //             if (dx * dx > dy * dy)
    //                 toX = pos.x = blockX + radius;
    //             else
    //                 toY = pos.y = blockY + 1 - radius;
    //         }
    //     }
    //     // is tile to the bottom-right a wall
    //     if (isBlocking(blockX + 1, blockY + 1) != 0 && !(blockBottom != 0 && blockRight != 0)) {
    //         var dx = toX - (blockX + 1);
    //         var dy = toY - (blockY + 1);
    //         if (dx * dx + dy * dy < radius * radius) {
    //             if (dx * dx > dy * dy)
    //                 toX = pos.x = blockX + 1 - radius;
    //             else
    //                 toY = pos.y = blockY + 1 - radius;
    //         }
    //     }
    // // is tile to the top-left a wall
    // if (isBlocking(blockX - 1, blockY - 1) != 0 && !(blockTop != 0 && blockLeft != 0)) {
    //     var dx = toX - blockX;
    //     var dy = toY - blockY;
    //     if (dx * dx + dy * dy < radius * radius) {
    //         if (dx * dx > dy * dy)
    //             toX = pos.x = blockX + radius;
    //         else
    //             toY = pos.y = blockY + radius;
    //     }
    // }
    // // is tile to the top-right a wall
    // if (isBlocking(blockX + 1, blockY - 1) != 0 && !(blockTop != 0 && blockRight != 0)) {
    //     var dx = toX - (blockX + 1);
    //     var dy = toY - blockY;
    //     if (dx * dx + dy * dy < radius * radius) {
    //         if (dx * dx > dy * dy)
    //             toX = pos.x = blockX + 1 - radius;
    //         else
    //             toY = pos.y = blockY + radius;
    //     }
    // }

    // return pos;
};

var isBlocking = function (x, y) {
    // // first make sure that we cannot move outside the boundaries of the level
    // if (y < 0 || y >= mapHeight || x < 0 || x >= mapWidth)
    //     return true;

    // // return true if the map block is not 0, ie. if there is a blocking wall.
    // return (map[Math.floor(y)][Math.floor(x)] != 0);
}

render();
