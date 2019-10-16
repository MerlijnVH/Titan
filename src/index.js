const THREE = require('three');

const scene = new THREE.Scene();

const keyboard = {};

// Using strings only to keep the array visually the same width

var map = [
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '1', '0', '0', '0', '0', '0'],
    ['0', '0', '1', '0', '1', '0', '0', '0', '0', '0'],
    ['0', '0', '1', '1', '1', '0', '0', '0', '0', '0'],
    ['0', '0', '1', '1', '1', '1', '1', '1', '0', '0'],
    ['0', '0', '1', '1', 'S', '1', '1', '1', '0', '0'],
    ['0', '0', '1', '1', '1', '1', '1', '1', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
]

var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

var mapSize = map.length;
var mapTileSize = 1;

setupKeyControls();

function withinBounds(map, x, y) {
    if (y >= 0 && y < map.length) {
        if (x >= 0 && x < map[y].length) {
            return true;
        }
    }

    return false;
}

for (var y = 0; y < mapSize; y++) {
    for (var x = 0; x < mapSize; x++) {
        var mapData = map[y][x];

        var mapTile = 0;

        if (withinBounds(map, x, y - 1)) {
            if (map[y - 1][x] == 0) {
                mapTile += 1;
            }
        }

        if (withinBounds(map, x, y + 1)) {
            if (map[y + 1][x] == 0) {
                mapTile += 4;
            }
        }

        if (withinBounds(map, x + 1, y)) {
            if (map[y][x + 1] == 0) {
                mapTile += 8;
            }
        }

        if (withinBounds(map, x - 1, y)) {
            if (map[y][x - 1] == 0) {
                mapTile += 2;
            }
        }

        // Floor

        if (mapData == 1) {
            var geometry = new THREE.PlaneGeometry(1, 1, 1);
            var material = new THREE.MeshNormalMaterial();
            var cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            cube.position.x = x * mapTileSize;
            cube.position.y = y * mapTileSize;
            cube.position.z = 0;
        }

        if (mapData == 'S') {
            var geometry = new THREE.PlaneGeometry(1, 1, 1);
            var material = new THREE.MeshNormalMaterial();
            var cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            cube.position.x = x * mapTileSize;
            cube.position.y = y * mapTileSize;
            cube.position.z = 0;

            // Set player camera

            camera.position.x = x * mapTileSize;
            camera.position.y = y * mapTileSize;
            camera.position.z = 0.75;
            camera.rotateX((Math.PI / 2));
            // camera.rotateY(0.30);
            // camera.rotateZ(0.30);
        }

        if (mapData == 0) {
            if (mapTile == 10) {
                var geometry = new THREE.PlaneGeometry(1, 1, 1);
                var material = new THREE.MeshNormalMaterial();
                var cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                cube.position.x = x * mapTileSize;
                cube.position.y = y * mapTileSize - (mapTileSize / 2);
                cube.rotateX(Math.PI / 2);
            }

            // Corner Right

            if (mapTile == 3 || mapTile == 6 || mapTile == 9 || mapTile == 12) {
                if (mapTile == 9) {
                    var geometry = new THREE.PlaneGeometry(1, 1, 1);
                    var material = new THREE.MeshNormalMaterial();
                    var cube = new THREE.Mesh(geometry, material);
                    scene.add(cube);
    
                    cube.position.x = x * mapTileSize - (mapTileSize / 2);
                    cube.position.y = y * mapTileSize;
                    cube.position.z = 0 + (mapTileSize / 2)
                    cube.rotateY(-(Math.PI / 2));

                    var geometry = new THREE.PlaneGeometry(1, 1, 1);
                    var material = new THREE.MeshNormalMaterial();
                    var cube = new THREE.Mesh(geometry, material);
                    scene.add(cube);
    
                    cube.position.x = x * mapTileSize;
                    cube.position.y = y * mapTileSize + (mapTileSize / 2);
                    cube.position.z = 0 + (mapTileSize / 2)
                    cube.rotateX(-(Math.PI / 2));
                }
            }

            // Wall Right

            if (mapTile == 7) {
                var geometry = new THREE.PlaneGeometry(1, 1, 1);
                var material = new THREE.MeshNormalMaterial();
                var cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                cube.position.x = x * mapTileSize + (mapTileSize / 2);
                cube.position.y = y * mapTileSize;
                cube.position.z = 0 + (mapTileSize / 2)
                cube.rotateY((Math.PI / 2));
            }

            // Wall Left

            if (mapTile == 13) {
                var geometry = new THREE.PlaneGeometry(1, 1, 1);
                var material = new THREE.MeshNormalMaterial();
                var cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                cube.position.x = x * mapTileSize - (mapTileSize / 2);
                cube.position.y = y * mapTileSize;
                cube.position.z = 0 + (mapTileSize / 2)
                cube.rotateY(-(Math.PI / 2));
            }

            // Wall Top

            if (mapTile == 14) {
                var geometry = new THREE.PlaneGeometry(1, 1, 1);
                var material = new THREE.MeshNormalMaterial();
                var cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                cube.position.x = x * mapTileSize;
                cube.position.y = y * mapTileSize - (mapTileSize / 2);
                cube.position.z = 0 + (mapTileSize / 2)
                cube.rotateX((Math.PI / 2));
            }

            // Wall Bottom

            if (mapTile == 11) {
                var geometry = new THREE.PlaneGeometry(1, 1, 1);
                var material = new THREE.MeshNormalMaterial();
                var cube = new THREE.Mesh(geometry, material);
                scene.add(cube);

                cube.position.x = x * mapTileSize;
                cube.position.y = y * mapTileSize + (mapTileSize / 2);
                cube.position.z = 0 + (mapTileSize / 2)
                cube.rotateX(-(Math.PI / 2));
            }
        }
    }
}

function setupKeyControls() {
    document.onkeyup = function (e) {
        switch (e.keyCode) {
            case 37:
                moveLeft = false;
                break;
            case 38:
                moveForward = false;
                break;
            case 39:
                moveRight = false;
                break;
            case 40:
                moveBack = false;
                break;
        }
    };

    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                moveLeft = true;
                break;
            case 38:
                moveForward = true;
                break;
            case 39:
                moveRight = true;
                break;
            case 40:
                moveBack = true;
                break;
        }
    };

    // Mouse

    document.onmousemove = function(e) {
        console.log(e.clientY);

        if (e.clientX < 50) {
            camY = 1;
        }
    }

    document.addEventListener('mousemove', function (ev) {
        // document.getElementById('mX').innerHTML = ev.clientX.toString();
        // document.getElementById('mY').innerHTML = ev.clientY.toString();

        // if (xPrev === -1 && yPrev === -1) {
        //     xPrev = ev.clientX;
        //     yPrev = ev.clientY;
        // }
        // if (ev.clientX < 50) {
        //     camY = 1;
        //     keepGoing = true;
        // } else if (ev.clientX > window.innerWidth - 50) {
        //     camY = -1;
        //     keepGoing = true;
        // } else {
        //     keepGoing = false;
        //     if (xPrev < ev.clientX) {
        //         camY = -1;
        //     } else if (xPrev > ev.clientX) {
        //         camY = 1;
        //     }
        //     if (yPrev < ev.clientY) {
        //         camX = -1;
        //     } else if (yPrev > ev.clientY) {
        //         camX = 1;
        //     }
        // }
        // xPrev = ev.clientX;
        // yPrev = ev.clientY;
    });
    // document.addEventListener('mouseout', function () {
    //     camX = camY = 0;
    // });
    // document.addEventListener('keypress', function (ev) {
    //     if (ev.which === 114) {
    //         camReset = true;
    //     }
    // });
}

var camX = 0;
var camY = 0;

var moveForward = false;
var moveLeft = false;
var moveRight = false;
var moveBack = false;

var velocity = new THREE.Vector3;
var prevTime = performance.now();

var speedMove = 12.0;
var speedRotate = 6.0;

var render = function () {
    requestAnimationFrame(render);

    console.log(camX + ' - ' + camY);

    var time = performance.now();
    var delta = (time - prevTime) / 1000;

    velocity.z -= velocity.z * 6.0 * delta;;
    velocity.y -= velocity.y * 4.0 * delta;

    if (moveForward) velocity.z -= speedMove * delta;
    if (moveBack) velocity.z += speedMove * delta;
    if (moveLeft) velocity.y += speedRotate * delta;
    if (moveRight) velocity.y -= speedRotate * delta;

    camera.translateZ(velocity.z * delta);
    camera.rotateY(velocity.y * delta);

    prevTime = time;

    renderer.render(scene, camera);
};

render();
