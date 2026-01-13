import * as THREE from 'three'
import "./style.css"

import { scene, camera, planet1, planet2, G, mass1, mass2} from './scene.js'
import { addMouseLook, checkMouseMovement, setupInput, updateMovement } from './controls.js'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector('.webgl')

const renderer = new THREE.WebGLRenderer({canvas,
    antialias: true,
    logarithmicDepthBuffer: true
})
renderer.setPixelRatio(2)
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

addMouseLook(canvas)
checkMouseMovement()
setupInput()

let previousTime = 0
const loop = (currentTime) => {
    let deltaTime = (currentTime - previousTime) / 1000
    if (deltaTime > 0.02) deltaTime = 0.016
    previousTime = currentTime

    const radius = planet1.position.distanceTo(planet2.position)
    const F = G * (mass1 * mass2) / (radius**2)
    const direction = new THREE.Vector3().subVectors(planet1.position, planet2.position).normalize()
    const acceleration = direction.multiplyScalar(F / mass2)

    planet2.velocity.add(acceleration.clone().multiplyScalar(deltaTime))
    planet2.position.add(planet2.velocity.clone().multiplyScalar(deltaTime)) 

    updateMovement(deltaTime)
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
window.requestAnimationFrame(loop)
