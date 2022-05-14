import * as exp from "constants";
import * as THREE from "three";

export class Light2 {
  light: THREE.PointLight;

  constructor() {
    this.light = new THREE.PointLight(0xffffff, 1);
    this.light.position.set(-9.5, 10, 2.5);
  }
}
