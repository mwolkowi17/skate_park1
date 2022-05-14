import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Camera1 } from './camera1'
import { Light1 } from './light1'
import { Light2 } from './light2'
import { Controls1 } from './controls1'
import { Loader1, originalMaterials } from './loader1'

export const scene = new THREE.Scene()

const light1 = new Light1()
scene.add(light1.light)

const light2 = new Light2()
scene.add(light2.light)

const camera1 = new Camera1()
scene.add(camera1.camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls1 = new Controls1(camera1.camera, renderer.domElement)
export const pickableObjects: THREE.Mesh[] = []
export let intersectedObject: THREE.Object3D | null
export let modelReady = false

const loader1 = new Loader1()

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera1.camera.aspect = window.innerWidth / window.innerHeight
    camera1.camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const raycaster = new THREE.Raycaster()
export let intersects: THREE.Intersection[]



document.addEventListener('click', onDocumentMouseMove, false)
function onDocumentMouseMove(event: MouseEvent) {
    raycaster.setFromCamera(
        {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        },
        camera1.camera
    )
    intersects = raycaster.intersectObjects(pickableObjects, false)

    if (intersects.length > 0) {
        // action methods of clickable objects
        console.log(intersects[0].object.name)
        if (intersects.length > 0) {
            intersectedObject = intersects[0].object
        } else {
            intersectedObject = null
        }
       


            const highlightedMaterial = new THREE.MeshBasicMaterial({
                //wireframe: true,
                color: 0x0000ff
            })
    
            
    
            pickableObjects.forEach((o: THREE.Mesh, i) => {
               
                if (intersectedObject && intersectedObject.name === o.name) {
                    pickableObjects[i].material = highlightedMaterial
                } else {
                    pickableObjects[i].material = originalMaterials[o.name]
                }
            })
        
    }

    

}

const stats = Stats()
document.body.appendChild(stats.dom)

const clock = new THREE.Clock()

function animate() {
    requestAnimationFrame(animate)

    controls1.main.update()


    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera1.camera)
}

animate()
