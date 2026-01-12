import * as THREE from 'three'

export const scene = new THREE.Scene()

export const player = new THREE.Object3D()
player.position.set(0, 0, 20)
scene.add(player)

export const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight)
player.add(camera)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.03)
scene.add(ambientLight)

const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.5
})
export const planet = new THREE.Mesh(geometry, material)
scene.add(planet)