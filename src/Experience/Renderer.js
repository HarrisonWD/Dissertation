import * as THREE from 'three'
import Experience from './Experience.js'
import productsJSON from './Products.json'

let INTERSECTED = null
let products = productsJSON
let product = null

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
                
        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }
        

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }
    
    update()
    {
        //Pointer Lock Controls Interaction and Raycast
        if(this.experience.camera.pointerLockControls.isLocked){
            const vector = new THREE.Vector3(0,0,-1)
            this.camera.pointerCamera.getWorldDirection(vector)
            const rayOrigin = this.camera.pointerCamera.position
            const rayDirection = vector
            this.experience.raycaster.set(rayOrigin, rayDirection)
            for (const object of this.experience.objectsToInteract){
                object.material.color.set(0xff0000)
                }
            const intersects = this.experience.raycaster.intersectObjects( this.experience.objectsToInteract, false);
            if(intersects.length) {
                INTERSECTED = intersects[0].object;
                INTERSECTED.material.color.set(0x00ff00)
            }
            this.instance.render(this.scene, this.camera.pointerCamera)
        } else {
            //Orbit Controls Interaction and Raycast
            this.experience.raycaster.setFromCamera(this.experience.pointer, this.camera.orbitCamera)
            for (const object of this.experience.objectsToInteract){
            object.material.color.set(0xff0000)
            }
            const intersects = this.experience.raycaster.intersectObjects(this.experience.objectsToInteract,false);
            if(intersects.length) {
                INTERSECTED = intersects[0].object;
                INTERSECTED.material.color.set(0x00ff00)
                const found = INTERSECTED.name
                const product = products[found]
                console.log(product)           
            }
            this.instance.render(this.scene, this.camera.orbitCamera)
        }        
               
    }
}