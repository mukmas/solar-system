import * as THREE from 'three'
import { camera, player } from './scene.js'

const keys = {
    "W": false,
    "A": false,
    "S": false,
    "D": false,
    "Shift": false,
    "Control": false,
    " ": false // space key
}

const walkingSpeed = 2700
const sprintSpeed = walkingSpeed * 3
const sensitivity = 0.0005
const forward = new THREE.Vector3()
const up = new THREE.Vector3(0, 1, 0)
const right = new THREE.Vector3()

export let speed

export function addMouseLook(canvas) {
    canvas.addEventListener("click", () => {
        canvas.requestPointerLock()
    })
}

export function checkMouseMovement() {
    window.addEventListener("mousemove", (event) => {
        player.rotation.y -= event.movementX * sensitivity
        camera.rotation.x -= event.movementY * sensitivity
        camera.rotation.x = Math.max(-Math.PI/2 + 0.01, Math.min(Math.PI/2 - 0.01, camera.rotation.x))
    })
}

export function setupInput() {
    window.addEventListener("keydown", (event) => {
        let key = event.key
        if (key.length === 1) key = key.toUpperCase()
        keys[key] = true
    })
    window.addEventListener("keyup", (event) => {
        let key = event.key
        if (key.length === 1) key = key.toUpperCase()
        keys[key] = false
    })
}

export function updateMovement(deltaTime) {
    camera.getWorldDirection(forward)
    right.crossVectors(forward, up).normalize()

    if (keys["Shift"])
        speed = sprintSpeed
    else
        speed = walkingSpeed

    if (keys["W"])
        player.position.add(forward.clone().multiplyScalar(speed * deltaTime))
    if (keys["S"])
        player.position.add(forward.clone().multiplyScalar(-speed * deltaTime))
    if (keys["D"])
        player.position.add(right.clone().multiplyScalar(speed * deltaTime))
    if (keys["A"])
        player.position.add(right.clone().multiplyScalar(-speed * deltaTime))
    if (keys["Control"])
        player.position.y -= speed * deltaTime
    if (keys[" "])
        player.position.y += speed * deltaTime

}