import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { scene, pickableObjects} from './client'

export class Loader1 {
    main: GLTFLoader
   
    constructor() {
        this.main = new GLTFLoader()
       
      
        this.main.load('models/SkateParkV3.glb', (gltf) => {
            gltf.scene.position.set(-8, 0, 0)
            gltf.scene.rotation.set(0, 0, 0)

            gltf.scene.traverse(function (child) {
                if ((child as THREE.Mesh).isMesh) {
                    const m = child as THREE.Mesh
                    m.castShadow = true
                    pickableObjects.push(m) 
                }
            })
            
            scene.add(gltf.scene)
            console.log(pickableObjects)
           
        })
    }

    methodtest1(){
        const highlightedMaterial = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x00ff00
        })
    pickableObjects[6].material=highlightedMaterial        
    }

   
}
