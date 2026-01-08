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

let speed = 0.1

const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
scene.add(camera)
camera.position.z = 20

const canvas = document.querySelector('.webgl')
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

const loop = () => {
    if (keys["W"])
        camera.position.z -= speed
    if (keys["A"])
        camera.position.x -= speed
    if (keys["S"])
        camera.position.z += speed
    if (keys["D"])
        camera.position.x += speed
    if (keys["Shift"])
        camera.position.y -= speed
    if (keys[" "])
        camera.position.y += speed

    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()