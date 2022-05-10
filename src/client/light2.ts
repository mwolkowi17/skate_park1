import * as exp from 'constants'
import * as THREE from 'three'

export class Light2 {
    light: THREE.PointLight

    constructor() {
        this.light = new THREE.PointLight(0xffffff, 2)
        this.light.position.set(-2.5, 2.5, 2.5)
    }
}
