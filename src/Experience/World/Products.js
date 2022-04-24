import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Products
{   

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.items = this.experience.resources.items
        this.debug = this.experience.ui
        this.products = []
        this.productsName = []
        this.count = 0

        // Setup
        this.itemsArray = Object.getOwnPropertyNames(this.items)
        this.sortItems()
        this.setModels()
        this.setProductParameters()

        
        //Debug 
        if(this.experience.debug.active)
        {
            this.debugSetup()
        }
        
    }

    sortItems(){
        for(const product of this.itemsArray)
        {
            if(product != 'ShopModel')
            {
                if(product != 'Shelves')
                {
                    this.productsName.push(product)                
                    this.products.push(this.experience.resources.items[product])
                }
            }
        }
    }


    setModels()
    {   
        for(const product of this.products)
        {
            this.model = product.scene
            this.model.name = this.productsName[this.count]        
            this.experience.objectsToInteract.push(this.model)
            this.scene.add(this.model)
                this.model.traverse((child) => {
                    if(child instanceof THREE.Mesh){
                        child.castShadow = true
                    }
                })
                this.count++
        }
        this.count = 0
    }

    setProductParameters()
    {
        this.experience.resources.items.MilkCarton.scene.position.set(0.5,0,0.5)
    }

    debugSetup()
    {   
        const productsFolder = this.debug.addFolder('Products').open(false)
        for(const productName of this.productsName)
        {
            const item = this.experience.resources.items[productName].scene
            const productFolder = productsFolder.addFolder(productName).open(false)
            const positionFolder = productFolder.addFolder('Position').open(false)
            positionFolder.add(item.position, 'x').min(-20).max(20).step(0.5)
            positionFolder.add(item.position, 'y').min(-20).max(20).step(0.5)
            positionFolder.add(item.position, 'z').min(-20).max(20).step(0.5)
            const scaleFolder = productFolder.addFolder('Scale').open(false)
            scaleFolder.add(item.scale,'x').min(-3).max(3).step(0.01)
            scaleFolder.add(item.scale,'y').min(-3).max(3).step(0.01)
            scaleFolder.add(item.scale,'z').min(-3).max(3).step(0.01)
        }
    }
        
       
}
