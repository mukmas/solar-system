import * as THREE from 'three'
import "./style.css"

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

const loop = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()