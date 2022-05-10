import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Controls1 {
    main: OrbitControls

    constructor(x: THREE.Camera, y: HTMLElement) {
        this.main = new OrbitControls(x, y)
        this.main.enableDamping = true
        this.main.target.set(0, 1, 0)
    }
}
