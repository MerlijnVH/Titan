import * as THREE from 'three';

export default class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();

        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
    }
}
