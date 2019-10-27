import * as THREE from 'three';
import { runInThisContext } from 'vm';

export default class InputManager {
    constructor(document) {
        this.document = document;

        this.moveVector = new THREE.Vector2();
        this.mouseVector = new THREE.Vector2();

        this.mouseSensitivity = 0.005;

        this.setupKeyControls(document);
        this.setupMouseControls(document);
        
        this.document.addEventListener('focus', event => {

        });

        this.document.addEventListener('blur', event => {
            this.moveVector = new THREE.Vector2();
            this.mouseVector = new THREE.Vector2();
        });
    }

    setupKeyControls(document) {
        document.addEventListener('keydown', event => {
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

        document.addEventListener('keyup', event => {
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

    setupMouseControls(document) {
        return;
        
        document.addEventListener('mousemove', event => {
            if (event.clientX > this.mouseVector.x) {
                this.moveVector.y -= this.mouseSensitivity;
            } else {
                this.moveVector.y += this.mouseSensitivity;
            }

            this.mouseVector.x = event.clientX;
            this.mouseVector.y = event.clientY;
        });

        document.addEventListener('mousedown', event => {

        });

        document.addEventListener('mouseup', event => {

        });

        document.addEventListener('mousewheel', event => {

        });
    }
}
