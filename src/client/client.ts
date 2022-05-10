import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Camera1 } from './camera1'
import { Light1 } from './light1'
import { Light2 } from './light2'
import { Controls1 } from './controls1'
import { Loader1 } from './loader1'



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
export const animationActions: THREE.AnimationAction[] = []
export let activeAction: THREE.AnimationAction
export let lastAction: THREE.AnimationAction

const loader1 = new Loader1()

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera1.camera.aspect = window.innerWidth / window.innerHeight
    camera1.camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const raycaster = new THREE.Raycaster()
let intersects: THREE.Intersection[]

document.addEventListener('mousemove', onDocumentMouseMove, false)
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
        // if (intersects[0].object === pickableObjects[0]) {
        //     loader1.play1()
        // }
        // if (intersects[0].object === pickableObjects[1]) {
        //     loader1.play2()
        // }
        // if (intersects[0].object === pickableObjects[2]) {
        //     loader1.play3()
        // }
        // if (intersects[0].object === pickableObjects[3]) {
        //     loader1.play4()
        // }
        // if (intersects[0].object === pickableObjects[4]) {
        //     loader1.play5()
        // }
        // if (intersects[0].object === pickableObjects[5]) {
        //     loader1.play6()
        // }

    }

}

const setAction = (toAction: THREE.AnimationAction) => {
    if (toAction != activeAction) {
        lastAction = activeAction
        activeAction = toAction
        //lastAction.stop()
        lastAction.fadeOut(1)
        activeAction.reset()
        activeAction.fadeIn(1)
        activeAction.play()
    }
}

const stats = Stats()
document.body.appendChild(stats.dom)

const clock = new THREE.Clock()

function animate() {
    requestAnimationFrame(animate)

    controls1.main.update()

    if (loader1.modelready2) {
        loader1.mixer.update(clock.getDelta())
        
        if(loader1.mixer.time>4&&loader1.ifaction===false){
            loader1.mixer.setTime(0)
        }
    }
    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera1.camera)
}

animate()
