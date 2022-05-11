import * as exp from 'constants'
import * as THREE from 'three'

export class Light1 {
    light: THREE.PointLight

    constructor() {
        this.light = new THREE.PointLight(0xffffff, 1)
        this.light.position.set(8.5, 7, 2.5)
    }
}
