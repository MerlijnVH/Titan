import * as THREE from 'three';

export default class MapManager {
    constructor(scene) {
        this.scene = scene;

        this.map = [
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

        this.mapTileSize = 1;
        this.mapWidth = this.map[0].length;
        this.mapHeight = this.map.length;

        const map = this.map;

        this.geometryFloor = new THREE.Geometry();
        this.geometryCeiling = new THREE.Geometry();
        this.geometryWall = new THREE.Geometry();

        for (var y = 0; y < this.mapHeight; y++) {
            for (var x = 0; x < this.mapWidth; x++) {
                const mapData = map[y][x];

                let mapTile = 0;

                if (this.isWithinBounds(x, y - 1)) {
                    if (map[y - 1][x] != 0) {
                        mapTile += 1;
                    }
                }

                if (this.isWithinBounds(x, y + 1)) {
                    if (map[y + 1][x] != 0) {
                        mapTile += 4;
                    }
                }

                if (this.isWithinBounds(x + 1, y)) {
                    if (map[y][x + 1] != 0) {
                        mapTile += 8;
                    }
                }

                if (this.isWithinBounds(x - 1, y)) {
                    if (map[y][x - 1] != 0) {
                        mapTile += 2;
                    }
                }

                if (mapData == 0) {
                    this.createFloor(x, y);
                    this.createCeiling(x, y);
                }

                if (mapData == 9) {
                    this.createFloor(x, y);
                    this.createCeiling(x, y);
                }

                if (mapData != 0) {
                    this.createBlock(x, y);
                }
            }
        }

        let texture = this.createTexture('assets/textures/floor0.png');
        let material = new THREE.MeshBasicMaterial({ map: texture });

        const meshFloor = new THREE.Mesh(this.geometryFloor, material);
        this.scene.add(meshFloor);

        texture = this.createTexture('assets/textures/ceil0.png');
        material = new THREE.MeshBasicMaterial({ map: texture });

        const meshCeiling = new THREE.Mesh(this.geometryCeiling, material);
        this.scene.add(meshCeiling);

        texture = this.createTexture('assets/textures/wall0.png');
        material = new THREE.MeshBasicMaterial({ map: texture });

        const meshWall = new THREE.Mesh(this.geometryWall, material);
        this.scene.add(meshWall);
    }

    getMapToWorldPosition(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);

        const position = new THREE.Vector3(x + (this.mapTileSize / 2), y + (this.mapTileSize / 2), 0);

        return position;
    }

    getWorldToMapPosition(position) {

    }

    isWithinBounds(x, y) {
        if (x >= 0 && x < this.mapWidth && y >= 0 && y < this.mapHeight) {
            return true;
        }

        return false;
    }

    isBlocking(x, y) {
        if (!this.isWithinBounds(x, y)) {
            return true;
        }

        return (this.map[Math.floor(y)][Math.floor(x)] != 0);
    }

    createTexture(path) {
        const texture = new THREE.TextureLoader().load(path);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        // texture.generateMipmaps = false;
        // texture.anisotropy = 0;

        return texture;
    }

    createFloor(x, y) {
        const geometry = new THREE.PlaneGeometry(1, 1, 1);

        const cube = new THREE.Mesh(geometry);
        cube.position.x = x * this.mapTileSize + (this.mapTileSize / 2);
        cube.position.y = y * this.mapTileSize + (this.mapTileSize / 2);
        cube.position.z = 0;
        cube.updateMatrix();

        this.geometryFloor.merge(cube.geometry, cube.matrix);
    }

    createCeiling(x, y) {
        const geometry = new THREE.PlaneGeometry(1, 1, 1);

        const cube = new THREE.Mesh(geometry);
        cube.position.x = x * this.mapTileSize + (this.mapTileSize / 2);
        cube.position.y = y * this.mapTileSize + (this.mapTileSize / 2);
        cube.position.z = this.mapTileSize;
        cube.rotation.x = (Math.PI / 2) * 90;
        cube.updateMatrix();

        this.geometryCeiling.merge(cube.geometry, cube.matrix);
    }

    createBlock(x, y) {
        const geometry = new THREE.PlaneGeometry(1, 1, 1);

        const wallTop = new THREE.Mesh(geometry);
        wallTop.position.x = x * this.mapTileSize + this.mapTileSize;
        wallTop.position.y = y * this.mapTileSize + (this.mapTileSize / 2);
        wallTop.position.z = (this.mapTileSize / 2);

        wallTop.rotation.x = (Math.PI / 2);
        wallTop.rotation.y = (Math.PI / 2);
        wallTop.rotation.z = 0;
        wallTop.updateMatrix();

        this.geometryWall.merge(wallTop.geometry, wallTop.matrix);

        const wallBottom = new THREE.Mesh(geometry);

        wallBottom.position.x = x * this.mapTileSize;
        wallBottom.position.y = y * this.mapTileSize + (this.mapTileSize / 2);
        wallBottom.position.z = (this.mapTileSize / 2);

        wallBottom.rotation.x = (Math.PI / 2);
        wallBottom.rotation.y = -(Math.PI / 2);
        wallBottom.rotation.z = 0;
        wallBottom.updateMatrix();

        this.geometryWall.merge(wallBottom.geometry, wallBottom.matrix);

        const wallRight = new THREE.Mesh(geometry);

        wallRight.position.x = x * this.mapTileSize + (this.mapTileSize / 2);
        wallRight.position.y = y * this.mapTileSize + this.mapTileSize;
        wallRight.position.z = (this.mapTileSize / 2);

        wallRight.rotation.x = (Math.PI / 2);
        wallRight.rotation.y = (Math.PI / 2) * 90;
        wallRight.rotation.z = 0;
        wallRight.updateMatrix();

        this.geometryWall.merge(wallRight.geometry, wallRight.matrix);

        const wallLeft = new THREE.Mesh(geometry);

        wallLeft.position.x = x * this.mapTileSize + (this.mapTileSize / 2);
        wallLeft.position.y = y * this.mapTileSize;
        wallLeft.position.z = (this.mapTileSize / 2);

        wallLeft.rotation.x = (Math.PI / 2);
        wallLeft.rotation.y = (Math.PI / 2) * 180;
        wallLeft.rotation.z = 0;
        wallLeft.updateMatrix();

        this.geometryWall.merge(wallLeft.geometry, wallLeft.matrix);
    }

    checkCollision(fromX, fromY, toX, toY, radius) {
        const position = new THREE.Vector3(fromX, fromY, 0);

        const blockX = Math.floor(toX);
        const blockY = Math.floor(toY);

        if (this.isBlocking(blockX, blockY)) {
            return position;
        }

        position.x = toX;
        position.y = toY;

        const blockTop = this.isBlocking(blockX, blockY - 1);
        const blockBottom = this.isBlocking(blockX, blockY + 1);
        const blockLeft = this.isBlocking(blockX - 1, blockY);
        const blockRight = this.isBlocking(blockX + 1, blockY);

        if (blockLeft != 0 && toX - blockX < radius) {
            toX = position.x = blockX + radius;
        }
        if (blockRight != 0 && blockX + 1 - toX < radius) {
            toX = position.x = blockX + 1 - radius;
        }
        if (blockTop != 0 && toY - blockY < radius) {
            toY = position.y = blockY + radius;
        }
        if (blockBottom != 0 && blockY + 1 - toY < radius) {
            toY = position.y = blockY + 1 - radius;
        }

        // Bottom Left

        if (this.isBlocking(blockX - 1, blockY + 1) != 0 && !(blockBottom != 0 && blockBottom != 0)) {
            let dx = toX - blockX;
            let dy = toY - (blockY + 1);
            if (dx * dx + dy * dy < radius * radius) {
                if (dx * dx > dy * dy)
                    toX = position.x = blockX + radius;
                else
                    toY = position.y = blockY + 1 - radius;
            }
        }

        // Bottom Right

        if (this.isBlocking(blockX + 1, blockY + 1) != 0 && !(blockBottom != 0 && blockRight != 0)) {
            let dx = toX - (blockX + 1);
            let dy = toY - (blockY + 1);
            if (dx * dx + dy * dy < radius * radius) {
                if (dx * dx > dy * dy)
                    toX = position.x = blockX + 1 - radius;
                else
                    toY = position.y = blockY + 1 - radius;
            }
        }

        // Top Left

        if (this.isBlocking(blockX - 1, blockY - 1) != 0 && !(blockTop != 0 && blockLeft != 0)) {
            let dx = toX - blockX;
            let dy = toY - blockY;
            if (dx * dx + dy * dy < radius * radius) {
                if (dx * dx > dy * dy)
                    toX = position.x = blockX + radius;
                else
                    toY = position.y = blockY + radius;
            }
        }

        // Top Right

        if (this.isBlocking(blockX + 1, blockY - 1) != 0 && !(blockTop != 0 && blockRight != 0)) {
            let dx = toX - (blockX + 1);
            let dy = toY - blockY;
            if (dx * dx + dy * dy < radius * radius) {
                if (dx * dx > dy * dy)
                    toX = position.x = blockX + 1 - radius;
                else
                    toY = position.y = blockY + radius;
            }
        }

        return position;
    }
}
