import * as THREE from 'three';
import Entity from './Entity';

export default class Player extends Entity {
    constructor(name, scene, camera, inputManager, mapManager) {
        super(name, 'car');

        this.inputManager = inputManager;
        this.mapManager = mapManager;

        this.playerSize = 1;
        this.playerRadius = 0.15;
        this.playerHeight = 0.75;

        const geometry = new THREE.PlaneGeometry(this.playerSize, this.playerSize, this.playerSize);
        const material = new THREE.MeshLambertMaterial();
        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);
        cube.position.x = 8;
        cube.position.y = 8;
        cube.position.z = 0.5;

        this.cube = cube;

        cube.add(camera);

        this.velocity = new THREE.Vector3;

        this.speedMove = 0.15;
        this.speedRotate = 0.05;

        this.moveDir = 0;
        this.moveRot = 0;
    }

    update(delta) {
        this.velocity.x -= this.velocity.x * 6.0 * delta;
        this.velocity.y -= this.velocity.y * 4.0 * delta;

        this.velocity.x += this.inputManager.moveVector.x * this.speedMove * delta;
        this.velocity.y += this.inputManager.moveVector.y * this.speedRotate * delta;

        this.moveDir = this.velocity.x;
        this.moveRot = this.velocity.y;

        let posX = this.cube.position.x;
        let posY = this.cube.position.y;

        let angle = this.cube.rotation.z;
    
        let newX = this.cube.position.x + Math.cos(angle) * this.moveDir;
        let newY = this.cube.position.y + Math.sin(angle) * this.moveDir;
    
        let update = this.mapManager.checkCollision(posX, posY, newX, newY, this.playerRadius);
    
        this.cube.position.set(update.x, update.y, this.playerHeight);
    
        this.cube.rotateZ(this.moveRot);
    }

    getName() {
        return 'It is a car: ' + super.getName();
    }
}
