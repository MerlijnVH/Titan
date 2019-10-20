const THREE = require('three');

const scene = new THREE.Scene();

var texture = new THREE.TextureLoader().load('assets/textures/wall0.png');
texture.magFilter = THREE.NearestFilter;
var materialWall = new THREE.MeshBasicMaterial({ map: texture });

var light = new THREE.AmbientLight(0x404040);
scene.add(light);

const keyboard = {};

// Using strings only to keep the array visually the same width

var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 3, 0, 3, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1],
    [1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 4, 0, 0, 4, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 4, 3, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var aspect = window.innerWidth / window.innerHeight;
var width = window.innerWidth;
var height = window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
// var camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
// camera.zoom = 32;
// camera.updateProjectionMatrix();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

var mapWidth = 0;
var mapHeight = 0;

var mapTileSize = 1;
var playerSize = 1;

setupKeyControls();

var gameCycleDelay = 1000 / 30;

function withinBounds(map, x, y) {
    if (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight)
        return true;

    return false;
}

mapWidth = map[0].length;
mapHeight = map.length;

var createFloor = function(x, y) {
    var geometry = new THREE.PlaneGeometry(1, 1, 1);
    var material = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x * mapTileSize + (mapTileSize / 2);
    cube.position.y = y * mapTileSize + (mapTileSize / 2);
    cube.position.z = 0;
}

var createWall = function(x, y, rotation) {
    var geometry = new THREE.PlaneGeometry(1, 1, 1);
    var material = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh(geometry, materialWall);
    scene.add(cube);

    cube.position.x = x * mapTileSize + (mapTileSize / 2);
    cube.position.y = y * mapTileSize + (mapTileSize / 2);
    cube.position.z = (mapTileSize / 2);
    cube.rotateX(THREE.Math.degToRad(90));
    cube.rotateY(THREE.Math.degToRad(rotation));
}

var createBlock = function(x, y) {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh(geometry, materialWall);
    scene.add(cube);

    cube.position.x = x * mapTileSize + (mapTileSize / 2);
    cube.position.y = y * mapTileSize + (mapTileSize / 2);
    cube.position.z = (mapTileSize / 2);
}

for (var y = 0; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {
        var mapData = map[y][x];

        var mapTile = 0;

        if (withinBounds(map, x, y - 1)) {
            if (map[y - 1][x] != 0) {
                mapTile += 1;
            }
        }

        if (withinBounds(map, x, y + 1)) {
            if (map[y + 1][x] != 0) {
                mapTile += 4;
            }
        }

        if (withinBounds(map, x + 1, y)) {
            if (map[y][x + 1] != 0) {
                mapTile += 8;
            }
        }

        if (withinBounds(map, x - 1, y)) {
            if (map[y][x - 1] != 0) {
                mapTile += 2;
            }
        }

        if (mapData == 0) {
            createFloor(x, y);
        }

        if (mapData == 9) {
            createFloor(x, y);
        }

        if (mapData != 0) {
            createBlock(x, y);
        }
    }
}

var moveVector = new THREE.Vector3();

function setupKeyControls() {
    document.onkeyup = function (e) {
        switch (e.keyCode) {
            case 37:
                moveLeft = false;
                moveVector.y = 0;
                break;
            case 39:
                moveRight = false;
                moveVector.y = 0;
                break;
            case 38:
                moveForward = false;
                moveVector.x = 0;
                break;
            case 40:
                moveBack = false;
                moveVector.x = 0;
                break;
        }
    };

    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                moveLeft = true;
                moveVector.y = 1;
                break;
            case 39:
                moveRight = true;
                moveVector.y = -1;
                break;
            case 38:
                moveForward = true;
                moveVector.x = -1;
                break;
            case 40:
                moveBack = true;
                moveVector.x = 1;
                break;
        }
    };

    // Mouse

    document.onmousemove = function (e) {
        // console.log(e.clientY);

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

var speedMove = 0.15;
var speedRotate = 0.05;

var moveDir = 0;
var moveRot = 0;
var rotation = 0;

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

    velocity.x += moveVector.x * speedMove * delta;
    velocity.y += moveVector.y * speedRotate * delta;

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

    update = checkCollision(posX, posY, newX, newY, 0.15);

    cube.position.set(update.x, update.y, cameraHeight);

    // cube.rotation.z = moveRot;
    cube.rotateZ(moveRot); // YES

    // camera.translateZ(velocity.z * delta);
    // camera.rotateY(velocity.y * delta);

    prevTime = time;

    renderer.render(scene, camera);
};

var checkCollision = function (fromX, fromY, toX, toY, radius) {
    var pos = new THREE.Vector3(fromX, fromY, 0);

    if (toY < 0 || toY >= mapHeight || toX < 0 || toX >= mapWidth)
        return pos;

    var blockX = Math.floor(toX);
    var blockY = Math.floor(toY);

    if (isBlocking(blockX, blockY)) {
        return pos;
    }

    pos.x = toX;
    pos.y = toY;

    var blockTop = isBlocking(blockX, blockY - 1);
    var blockBottom = isBlocking(blockX, blockY + 1);
    var blockLeft = isBlocking(blockX - 1, blockY);
    var blockRight = isBlocking(blockX + 1, blockY);

    if (blockLeft != 0 && toX - blockX < radius) {
        toX = pos.x = blockX + radius;
    }
    if (blockRight != 0 && blockX + 1 - toX < radius) {
        toX = pos.x = blockX + 1 - radius;
    }
    if (blockTop != 0 && toY - blockY < radius) {
        toY = pos.y = blockY + radius;
    }
    if (blockBottom != 0 && blockY + 1 - toY < radius) {
        toY = pos.y = blockY + 1 - radius;
    }

        // is tile to the bottom-left a wall
        if (isBlocking(blockX - 1, blockY + 1) != 0 && !(blockBottom != 0 && blockBottom != 0)) {
            var dx = toX - blockX;
            var dy = toY - (blockY + 1);
            if (dx * dx + dy * dy < radius * radius) {
                if (dx * dx > dy * dy)
                    toX = pos.x = blockX + radius;
                else
                    toY = pos.y = blockY + 1 - radius;
            }
        }
        // is tile to the bottom-right a wall
        if (isBlocking(blockX + 1, blockY + 1) != 0 && !(blockBottom != 0 && blockRight != 0)) {
            var dx = toX - (blockX + 1);
            var dy = toY - (blockY + 1);
            if (dx * dx + dy * dy < radius * radius) {
                if (dx * dx > dy * dy)
                    toX = pos.x = blockX + 1 - radius;
                else
                    toY = pos.y = blockY + 1 - radius;
            }
        }
    // is tile to the top-left a wall
    if (isBlocking(blockX - 1, blockY - 1) != 0 && !(blockTop != 0 && blockLeft != 0)) {
        var dx = toX - blockX;
        var dy = toY - blockY;
        if (dx * dx + dy * dy < radius * radius) {
            if (dx * dx > dy * dy)
                toX = pos.x = blockX + radius;
            else
                toY = pos.y = blockY + radius;
        }
    }
    // is tile to the top-right a wall
    if (isBlocking(blockX + 1, blockY - 1) != 0 && !(blockTop != 0 && blockRight != 0)) {
        var dx = toX - (blockX + 1);
        var dy = toY - blockY;
        if (dx * dx + dy * dy < radius * radius) {
            if (dx * dx > dy * dy)
                toX = pos.x = blockX + 1 - radius;
            else
                toY = pos.y = blockY + radius;
        }
    }

    return pos;
};

var isBlocking = function (x, y) {
    // first make sure that we cannot move outside the boundaries of the level
    if (y < 0 || y >= mapHeight || x < 0 || x >= mapWidth)
        return true;

    // return true if the map block is not 0, ie. if there is a blocking wall.
    return (map[Math.floor(y)][Math.floor(x)] != 0);
}

render();
