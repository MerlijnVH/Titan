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
                }

                if (mapData == 9) {
                    this.createFloor(x, y);
                }

                if (mapData != 0) {
                    this.createBlock(x, y);
                }
            }
        }
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

    createFloor(x, y) {
        const geometry = new THREE.PlaneGeometry(1, 1, 1);
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        cube.position.x = x * this.mapTileSize + (this.mapTileSize / 2);
        cube.position.y = y * this.mapTileSize + (this.mapTileSize / 2);
        cube.position.z = 0;
    }

    createBlock(x, y) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        cube.position.x = x * this.mapTileSize + (this.mapTileSize / 2);
        cube.position.y = y * this.mapTileSize + (this.mapTileSize / 2);
        cube.position.z = (this.mapTileSize / 2);
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
    };
}
