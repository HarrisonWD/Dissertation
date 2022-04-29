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
        this.pointerCamera.position.set(-3,1.5,16)
        this.scene.add(this.pointerCamera)
        
        this.pointerToggle = false
    }

    setOrbitControls()
    {
        this.orbitControls = new OrbitControls(this.orbitCamera, this.canvas)
        this.orbitControls.enableDamping = true
        this.orbitControls.enablePan = true
        this.orbitControls.keyPanSpeed = 14
        this.orbitControls.screenSpacePanning = true
        this.orbitControls.maxPolarAngle = Math.PI / 2.4
        this.orbitControls.minPolarAngle = Math.PI / 5
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

    setCameraLocation(name){
        const reticle = document.querySelector('.reticle')
        if(this.pointerLockControls.isLocked == true)
        {
            reticle.classList.add('hidden')
            this.pointerLockControls.unlock()
            this.orbitControls.enablePan = true
        }
        else 
        {
            reticle.classList.remove('hidden')
            this.pointerLockControls.lock()
            this.orbitControls.enablePan = false
            console.log(name)
            if(name === 'SignDairy'){
                this.pointerCamera.position.set(-2.5,1.5,7.5)
            }
            if(name === 'SignMeat'){
                this.pointerCamera.position.set(2.5,1.5,7.5)
            }
            if(name === 'SignFrozen'){
                this.pointerCamera.position.set(0.0035,1.5,1)
            }
        }
    }

    resize()
    {
        this.orbitCamera.aspect = this.sizes.width / this.sizes.height
        this.orbitCamera.updateProjectionMatrix()

        this.pointerCamera.aspect = this.sizes.width / this.sizes.height
        this.pointerCamera.updateProjectionMatrix()
    }

    update()
    {   
        this.orbitControls.update()
    }
}