import * as THREE from 'three';

export default class InputManager {
    constructor(document) {
        this.document = document;

        this.moveVector = new THREE.Vector2();

        this.setupKeyControls(document);
    }

    setupKeyControls() {
        this.document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case 37:
                    this.moveVector.y = 1;
                    break;
                case 39:
                    this.moveVector.y = -1;
                    break;
                case 38:
                    this.moveVector.x = -1;
                    break;
                case 40:
                    this.moveVector.x = 1;
                    break;
            }
        });

        this.document.addEventListener('keyup', event => {
            switch (event.keyCode) {
                case 37:
                    this.moveVector.y = 0;
                    break;
                case 39:
                    this.moveVector.y = 0;
                    break;
                case 38:
                    this.moveVector.x = 0;
                    break;
                case 40:
                    this.moveVector.x = 0;
                    break;
            }
        });
    }
}
