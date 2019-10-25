import * as THREE from 'three';

export default class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();

        const color = 0x000000;
        const near = 2;
        const far = 8;
        this.scene.fog = new THREE.Fog(color, near, far);

        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
    }
}
