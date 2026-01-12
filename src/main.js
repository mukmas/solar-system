import * as THREE from 'three'
import "./style.css"

import { scene, camera } from './scene.js'
import { addMouseLook, checkMouseMovement, setupInput, updateMovement } from './controls.js'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector('.webgl')

const renderer = new THREE.WebGLRenderer({canvas})
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
    previousTime = currentTime

    updateMovement(deltaTime)
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()