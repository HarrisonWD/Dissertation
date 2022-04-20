import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

export default class Camera {
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        
        this.setInstance()
        this.setOrbitControls()
        this.setPointerLockControls()
    }

    setInstance()
    {
        this.orbitCamera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.orbitCamera.position.set(0,4,16)
        this.scene.add(this.orbitCamera)

        this.pointerCamera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.pointerCamera.position.set(0,4,16)
        this.scene.add(this.pointerCamera)
        
        this.pointerToggle = false
    }

    setOrbitControls()
    {
        this.orbitControls = new OrbitControls(this.orbitCamera, this.canvas)
        this.orbitControls.enableDamping = true
        this.orbitControls.enablePan = true
        this.orbitControls.panSpeed = 100
        this.orbitControls.keyPanSpeed = 14
        this.orbitControls.screenSpacePanning = true
        this.orbitControls.listenToKeyEvents(window)
        this.orbitControls.keys = {
            LEFT: 'KeyA',
            UP: 'KeyW',
            RIGHT: 'KeyD',
            BOTTOM: 'KeyS'
        }
    }

    setPointerLockControls()
    {
        this.pointerLockControls = new PointerLockControls(this.pointerCamera, this.canvas)
    }

    switchControls()
    {
        console.log('action')
    }

    resize()
    {
        this.orbitCamera.aspect = this.sizes.width / this.sizes.height
        this.orbitCamera.updateProjectionMatrix()
    }

    update()
    {   
        this.orbitControls.update()
    }
}