import * as THREE from 'three';
import Entity from './Entity';

export default class Enemy extends Entity {
    constructor(name, x, y, scene, mapManager) {
        super(name, 'car');

        // this.mapManager = mapManager;

        this.playerRadius = 0.40;
        this.playerHeight = 0.75;

        const geometry = new THREE.BoxGeometry(this.playerRadius, this.playerRadius, this.playerHeight);
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);

        this.speedMove = 0.05;
        this.speedRotate = 0.05;

        scene.add(cube);
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = 0.5;

        this.cube = cube;

        this.position = cube.position;
        this.destination = new THREE.Vector3();

        // this.cube = cube;

        // this.velocity = new THREE.Vector3;

        // this.speedMove = 0.15;
        // this.speedRotate = 0.05;

        // this.moveDir = 0;
        // this.moveRot = 0;
    }

    update(delta) {
        this.velocity.x -= this.velocity.x * 6.0 * delta;
        this.velocity.y -= this.velocity.y * 4.0 * delta;

        if (this.destination.x && this.destination.y) {
            let direction = new THREE.Vector3();

            direction.subVectors(this.destination, this.cube.position).normalize();

            this.velocity.x += direction.x * this.speedMove * delta;
            this.velocity.y += direction.y * this.speedMove * delta;

            let newX = this.cube.position.x + this.velocity.x;
            let newY = this.cube.position.y + this.velocity.y;

            this.cube.position.set(newX, newY, this.playerHeight / 2);
        }
    }

    GoTo(position) {
        this.destination = new THREE.Vector3(position.x, position.y, 0);
    }

    getName() {
        return 'It is a car: ' + super.getName();
    }
}
