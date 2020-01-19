import * as THREE from 'three';
import * as Stats from 'stats.js';
import SceneManager from './modules/SceneManager';
import InputManager from './modules/InputManager';
import MapManager from './modules/MapManager';
import Player from './modules/Player';
import Enemy from './modules/Enemy';

const sceneManager = new SceneManager();
const inputManager = new InputManager(document);
const mapManager = new MapManager(sceneManager.scene);

const clock = new THREE.Clock();
let delta = 0;

let scene = sceneManager.scene;

let width = window.innerWidth;
let height = window.innerHeight;
let aspect = width / height;

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;

camera.rotateZ(45 * (Math.PI / 2));
camera.rotateX(45 * (Math.PI / 2));

const player = new Player('Player', 8, 8, scene, camera, inputManager, mapManager);

const enemy = new Enemy('Duder', 8, 10, scene, mapManager);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

document.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 32:
            shoot();
            break;
    }
});



var material = new THREE.LineBasicMaterial({ color: 0xAAFFAA });

// crosshair size
var x = 0.01, y = 0.01;

var geometry = new THREE.Geometry();

// crosshair
geometry.vertices.push(new THREE.Vector3(0, y, 0));
geometry.vertices.push(new THREE.Vector3(0, -y, 0));
geometry.vertices.push(new THREE.Vector3(0, 0, 0));
geometry.vertices.push(new THREE.Vector3(x, 0, 0));    
geometry.vertices.push(new THREE.Vector3(-x, 0, 0));

var crosshair = new THREE.Line( geometry, material );

// // place it in the center
var crosshairPercentX = 50;
var crosshairPercentY = 50;
var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;

crosshair.position.x = crosshairPositionX * camera.aspect;
crosshair.position.y = crosshairPositionY;

crosshair.position.z = -0.3;

camera.add( crosshair );

function shoot() {
    console.log('pew pew');

    let raycaster = new THREE.Raycaster();

    let originPosition = new THREE.Vector3(player.cube.position.x, player.cube.position.y, player.cube.position.z);
    // let originDirection = new THREE.Vector3(player.cube.rotation.x, player.cube.rotation.y, player.cube.rotation.z);
    // let originDirection = camera.rotation;

    var originDirection = new THREE.Vector3(); // create once and reuse it!
    camera.getWorldDirection( originDirection );

    // var dir = new THREE.Vector3( 1, 2, 0 );

    //normalize the direction vector (convert to vector of length 1)
    originDirection.normalize();
    
    // var origin = new THREE.Vector3( 0, 0, 0 );
    var length = 0.5;
    var hex = 0xffff00;
    
    var arrowHelper = new THREE.ArrowHelper( originDirection, originPosition, length, hex );
    scene.add( arrowHelper );
    

    // var vector = new THREE.Vector3(1, 0, 0);
    // vector.applyEuler(player.cube.rotation, camera.eulerOrder);

    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    // var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    // cube.position.set(originPosition.x, originPosition.y, originPosition.z);

    raycaster.set(originPosition, originDirection);

    let intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
        let intersectObj = intersects[i];

        if (intersectObj.object.name == "Enemy") {
        scene.remove(intersectObj.object);
        }

        /*
            An intersection has the following properties :
                - object : intersected object (THREE.Mesh)
                - distance : distance from camera to intersection (number)
                - face : intersected face (THREE.Face3)
                - faceIndex : intersected face index (number)
                - point : intersection point (THREE.Vector3)
                - uv : intersection point in the object's UV coordinates (THREE.Vector2)
        */
    }
}

function render() {
    stats.begin();

    delta = clock.getDelta();

    player.update(delta);
    enemy.update(delta);

    enemy.GoTo(mapManager.getMapToWorldPosition(player.PositionX + 1, player.PositionY));

    renderer.render(scene, camera);

    stats.end();

    requestAnimationFrame(render);
}

render();
