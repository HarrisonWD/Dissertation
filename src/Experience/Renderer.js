import * as THREE from 'three'
import Experience from './Experience.js'
import productsJSON from './Products.json'
import Cart from './Utils/Cart.js'
import EventEmitter from './Utils/EventEmitter.js'

let products = productsJSON

let currentIntersect = null

let product = null

export default class Renderer extends EventEmitter {
    constructor() {
        super()
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.cart = new Cart()
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
        document.body.appendChild(this.instance.domElement)
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
        if (this.experience.camera.pointerLockControls.isLocked) {
            const vector = new THREE.Vector3(0, 0, -1)
            this.camera.pointerCamera.getWorldDirection(vector)
            const rayOrigin = this.camera.pointerCamera.position
            const rayDirection = vector
            this.experience.raycaster.set(rayOrigin, rayDirection)
            const intersects = this.experience.raycaster.intersectObjects(this.experience.objectsToInteract, true);
            if (intersects.length > 0) {
                if (currentIntersect === null) {
                    this.intersected = intersects[0].object.uuid
                    for (let product of this.experience.objectsToInteract) {
                        if (product.children[0].type == 'Group') {
                            const childrenOfObject = product.children[0].children
                            for (const mesh of childrenOfObject) {
                                if (mesh.uuid === this.intersected) {
                                    this.productFound = this.experience.objectsToInteract[this.count].name
                                }
                            }
                            product.children[0].children[0]
                        }
                        else if (product.children[0].uuid === this.intersected) {
                            this.productFound = this.experience.objectsToInteract[this.count].name
                        }
                        this.count++
                    }
                    const name = this.productFound
                    this.product = products[name]
                    product = this.product
                    this.instance.domElement.onmouseup = (() => {
                        if (product) {
                            this.cart.addProductToCart(product)
                        }
                    })
                    this.count = 0
                    currentIntersect = intersects[0]
                }
            }
            else {
                if (currentIntersect) {
                    product = null
                }
                currentIntersect = null
            }

            this.instance.render(this.scene, this.camera.pointerCamera)
        } else {
            //Orbit Controls Interaction and Raycast
            this.experience.raycaster.setFromCamera(this.experience.pointer, this.camera.orbitCamera)
            const intersects = this.experience.raycaster.intersectObjects(this.experience.objectsToInteract, true);
            if (intersects.length > 0) {
                if (currentIntersect === null) {
                    const canvas = document.querySelector('.webgl')
                    canvas.classList.add('interactive')
                    this.intersected = intersects[0].object.uuid
                    for (let product of this.experience.objectsToInteract) {
                        if (product.children[0].type == 'Group') {
                            const childrenOfObject = product.children[0].children
                            for (const mesh of childrenOfObject) {
                                if (mesh.uuid === this.intersected) {
                                    this.productFound = this.experience.objectsToInteract[this.count].name
                                }
                            }
                            product.children[0].children[0]
                        }
                        else if (product.children[0].uuid === this.intersected) {
                            this.productFound = this.experience.objectsToInteract[this.count].name
                        }
                        this.count++
                    }
                    const name = this.productFound
                    this.product = products[name]
                    product = this.product
                    this.instance.domElement.onmouseup = (() => {
                        if (product) {
                            this.cart.addProductToCart(product)
                        }
                    })
                    this.count = 0
                    currentIntersect = intersects[0]
                }
            }
            else {
                if (currentIntersect) {
                    const canvas = document.querySelector('.webgl')
                    canvas.classList.remove('interactive')
                    product = null
                }
                currentIntersect = null
            }

     
        
           

            this.instance.render(this.scene, this.camera.orbitCamera)
        }
    }
}