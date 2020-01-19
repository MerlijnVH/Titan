import * as THREE from 'three';

export default class Entity {
    constructor(name, scene) {
        this.name = name;
        this.scene = scene;

        this.PositionX = 0;
        this.PositionY = 0;

        this.Health = 100;

        this.velocity = new THREE.Vector3;
    }

    update(delta) {

    }

    MapPosition() {
        const position = new THREE.Vector2(Math.floor(this.PositionX), Math.floor(this.PositionY));

        return position;
    }

    getName() {
        return this.name;
    }
}
