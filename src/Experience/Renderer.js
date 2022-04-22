import * as THREE from 'three'
import Experience from './Experience.js'
import productsJSON from './Products.json'

let products = productsJSON
export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.productFound = null
        this.productFromJSON = null
        this.product = null
        this.count = 0
        this.intersected = null
                
        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
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
        // Count interactable objects
        this.productsCount = this.experience.objectsToInteract.length
            //Pointer Lock Controls Interaction and Raycast
        if(this.experience.camera.pointerLockControls.isLocked){
            const vector = new THREE.Vector3(0,0,-1)
            this.camera.pointerCamera.getWorldDirection(vector)
            const rayOrigin = this.camera.pointerCamera.position
            const rayDirection = vector
            this.experience.raycaster.set(rayOrigin, rayDirection)
            const intersects = this.experience.raycaster.intersectObjects(this.experience.objectsToInteract, true);
            if(intersects.length) {
                this.intersected = intersects[0].object.uuid
                for(let product of this.experience.objectsToInteract){
                    if(product.children[0].type == 'Group'){
                        const childrenOfObject = product.children[0].children
                        for(const mesh of childrenOfObject)
                        {
                            if(mesh.uuid === this.intersected)
                            {
                                this.productFound = this.experience.objectsToInteract[this.count].name
                            }
                        }
                        product.children[0].children[0]
                    }
                    else if(product.children[0].uuid === this.intersected){
                        this.productFound = this.experience.objectsToInteract[this.count].name
                    }
                    this.count++
                }
                const name = this.productFound
                this.product = products[name]
                this.count = 0
                console.log(this.product)         
            }
            this.instance.render(this.scene, this.camera.pointerCamera)
        } else {
            //Orbit Controls Interaction and Raycast
            this.experience.raycaster.setFromCamera(this.experience.pointer, this.camera.orbitCamera)
            const intersects = this.experience.raycaster.intersectObjects(this.experience.objectsToInteract, true);
            if(intersects.length) {
                this.intersected = intersects[0].object.uuid
                for(let product of this.experience.objectsToInteract){
                    if(product.children[0].type == 'Group'){
                        const childrenOfObject = product.children[0].children
                        for(const mesh of childrenOfObject)
                        {
                            if(mesh.uuid === this.intersected)
                            {
                                this.productFound = this.experience.objectsToInteract[this.count].name
                            }
                        }
                        product.children[0].children[0]
                    }
                    else if(product.children[0].uuid === this.intersected){
                        this.productFound = this.experience.objectsToInteract[this.count].name
                    }
                    this.count++
                }
                const name = this.productFound
                this.product = products[name]
                this.count = 0  
                console.log(this.product)    
            }
            this.instance.render(this.scene, this.camera.orbitCamera)
        }        
               
    }
}