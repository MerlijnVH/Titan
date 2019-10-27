import * as THREE from 'three';

export default class Entity {
    constructor(name) {
        this.name = name;

        this.PositionX = 0;
        this.PositionY = 0;

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
