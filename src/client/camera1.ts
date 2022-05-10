import * as THREE from 'three'

export class Camera1 {
    camera: THREE.PerspectiveCamera

    constructor() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.camera.position.set(0, 1.2, 1.0)
    }
}
