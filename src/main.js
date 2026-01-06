import * as THREE from 'three'
import "./style.css"

const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
scene.add(camera)

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setPixelRatio(2)
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)