import * as THREE from 'three'

export const scene = new THREE.Scene()

export const player = new THREE.Object3D()
player.position.set(0, 5000, 40000)
scene.add(player)

export const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000000)
player.add(camera)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.01)
scene.add(ambientLight)

const sunGeometry = new THREE.SphereGeometry(3000, 64, 64)
const planetGeometry = new THREE.SphereGeometry(1000, 64, 64)

const sunMaterial = new THREE.MeshStandardMaterial({
    color: "#a34123",
    emissive: "#6b2916",
    emissiveIntensity: 20,
    roughness: 0.5
})

const planetMaterial = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 1,
})
export const planet1 = new THREE.Mesh(sunGeometry, sunMaterial)
export const planet2 = new THREE.Mesh(planetGeometry, planetMaterial)

const sunLight = new THREE.PointLight("#a15d35", 300000000, 0)
planet1.add(sunLight)

export const G = 6.674 * 10**-11
export const mass1 = 2e22
export const mass2 = 1

planet2.position.set(25000, 0, 0)

const r = planet2.position.distanceTo(planet1.position)
const speed = Math.sqrt((G * mass1) / r)
const sidewaysDir = new THREE.Vector3(-planet2.position.z, 0, planet2.position.x).normalize()

planet2.velocity = sidewaysDir.multiplyScalar(speed)

scene.add(planet1)
scene.add(planet2)
