import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Milk
{   

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.products = this.experience.resources.items
        this.debug = this.experience.debug

        // Setup

        this.productsArray = Object.getOwnPropertyNames(this.products)

    
        // Debug 
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Milk Model')
        }
        this.setModels()
        this.setProductLocation()
    }

    setModels()
    {   
        for(const productName of this.productsArray){
            this.product = this.products[productName].scene
            if(productName != 'shopModel'){
                this.product.name = productName
                this.experience.objectsToInteract.push(this.product)
                this.scene.add(this.product)
                this.product.traverse((child) => {
                    if(child instanceof THREE.Mesh){
                        child.castShadow = true
                    }
                })
            }  
        }
    }

    setProductLocation(){
        this.experience.resources.items.MilkCarton.scene.position.set(0,0,12)
    }


        
       
    }
