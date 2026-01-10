import * as THREE from 'three'
import "./style.css"

const keys = {
    "W": false,
    "A": false,
    "S": false,
    "D": false,
    "Shift": false,
    " ": false // space key
}

let speed = 10
const sensitivity = 0.001
const forward = new THREE.Vector3()
const up = new THREE.Vector3(0, 1, 0)
const right = new THREE.Vector3()

const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const player = new THREE.Object3D()
player.position.set(0, 0, 20)
scene.add(player)

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
player.add(camera)

const canvas = document.querySelector('.webgl')
canvas.addEventListener("click", () => {
    canvas.requestPointerLock()
})
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setPixelRatio(2)
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.03)
scene.add(ambientLight)

const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.5
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener("mousemove", (event) => {
    player.rotation.y -= event.movementX * sensitivity
    camera.rotation.x -= event.movementY * sensitivity
    camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, camera.rotation.x))
})

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

let previousTime = 0

const loop = (currentTime) => {
    let deltaTime = (currentTime - previousTime) / 1000
    previousTime = currentTime

    camera.getWorldDirection(forward)
    right.crossVectors(forward, up).normalize()

    if (keys["W"])
        player.position.add(forward.clone().multiplyScalar(speed * deltaTime))
    if (keys["S"])
        player.position.add(forward.clone().multiplyScalar(-speed * deltaTime))
    if (keys["D"])
        player.position.add(right.clone().multiplyScalar(speed * deltaTime))
    if (keys["A"])
        player.position.add(right.clone().multiplyScalar(-speed * deltaTime))
    if (keys["Shift"])
        player.position.y -= speed * deltaTime
    if (keys[" "])
        player.position.y += speed * deltaTime

    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()