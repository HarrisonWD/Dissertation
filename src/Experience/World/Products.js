import * as THREE from 'three'
import Experience from '../Experience.js'

let test = null
export default class Products
{   

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.items = this.experience.resources.Products
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
            this.productsName.push(product)                
            this.products.push(this.experience.resources.Products[product])
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
        let x = 0
        let z = 0
        let y = 0

        
        // Milk
        // Frist Row
        x = -4
        y = 1.38
        z = 2
        this.Milk = this.experience.resources.Products.MilkCarton.scene
        this.Milk.position.set(0,-8,0)
        for(var i = 0; i < 8; i++){
            this.Milk[i] = this.Milk.clone()
            this.experience.objectsToInteract.push(this.Milk[i])
            this.Milk[i].rotateY(Math.PI * 1.5)
            this.Milk[i].position.set(x+=0.3,y,z)
            this.scene.add(this.Milk[i])
        }

        // Second Row
        x= -4
        y = 0.58
        for(var i = 0; i < 8; i++){
            this.Milk[i] = this.Milk.clone()
            this.experience.objectsToInteract.push(this.Milk[i])
            this.Milk[i].rotateY(Math.PI * 1.5)
            this.Milk[i].position.set(x+=0.3,y,z)
            this.scene.add(this.Milk[i])
        }
        // Cereal
        // First Row
        y = 0.13
        z = 2
        x = -2.5
        this.items.AllBranCereal.scene.position.set(x++, y, z)
        this.items.AllBranCerealLarge.scene.position.set(x++, y, z)
        this.items.OteesChocolate.scene.position.set(x++, y, z)
        this.items.OteesBubblegum.scene.position.set(x++, y, z)
        this.items.CocoPopsChoco.scene.position.set(x++, y, z)
        this.items.CheeriosCereal.scene.position.set(x++, y, z)
        
        // Second Row
        y = -0.67
        x = -2.5
        this.items.PorridgeOriginal.scene.position.set(x++, y, z)
        this.items.PorridgeBanana.scene.position.set(x++, y, z)
        this.items.PorridgeChocolate.scene.position.set(x++, y, z)
        this.items.PorridgeStrawberry.scene.position.set(x++, y, z)
        this.items.CocoPopsCrunchy.scene.position.set(x++, y, z)
        this.items.CheeriosCerealHoney.scene.position.set(x++, y, z)

        // Meats 
        // First Row
        x = 0.8
        y = 1.38
        z = 4
        this.BSaus = this.experience.resources.Products.BoereworsSausage.scene
        this.BSaus.position.set(0,-8,0)
        for(var i = 0; i < 2; i++){
            this.BSaus[i] = this.BSaus.clone()
            this.experience.objectsToInteract.push(this.BSaus[i])
            this.BSaus[i].position.set(x+=0.5,y,z)
            this.BSaus[i].rotateX(Math.PI * 0.5)
            this.BSaus[i].scale.set(1.3, 1.3, 1.3)
            this.scene.add(this.BSaus[i])
        }
        x = 2
        y = 2.05
        z = 3.95
        this.chicken = this.experience.resources.Products.ChickenBreasts.scene
        this.chicken.position.set(0,-8,0)
        for(var i = 0; i < 2; i++){
            this.chicken[i] = this.chicken.clone()
            this.experience.objectsToInteract.push(this.chicken[i])
            this.chicken[i].rotateX(Math.PI * 0.5)
            this.chicken[i].position.set(x+=0.5,y,z)
            this.chicken[i].scale.set(1.3, 1.3, 1.3)
            this.scene.add(this.chicken[i])
        }

        // Second Row
        x = 1.2
        y = 1
        z = 4
        this.Steak = this.experience.resources.Products.Steak.scene
        this.Steak.position.set(0,-8,0)
        for(var i = 0; i < 2; i++){
            this.Steak[i] = this.Steak.clone()
            this.experience.objectsToInteract.push(this.Steak[i])
            this.Steak[i].rotateX(Math.PI * 0.4)
            this.Steak[i].position.set(x+=0.5,y,z)
            this.Steak[i].scale.set(1.3, 1.3, 1.3)
            this.scene.add(this.Steak[i])
        }

        x = 2.4
        y = 1.2
        z = 3.7
        this.ChickenThighs = this.experience.resources.Products.ChickenThighs.scene
        this.ChickenThighs.position.set(0,-8,0)
        for(var i = 0; i < 2; i++){
            this.ChickenThighs[i] = this.ChickenThighs.clone()
            this.experience.objectsToInteract.push(this.ChickenThighs[i])
            this.ChickenThighs[i].rotateX(Math.PI * 0.4)
            this.ChickenThighs[i].position.set(x+=0.5,y,z)
            this.ChickenThighs[i].scale.set(1.3, 1.3, 1.3)
            this.scene.add(this.ChickenThighs[i])
        }


        // this.items.ChickenThighs.scene.rotateX(Math.PI * 0.4)
        // this.items.ChickenThighs.scene.scale.set(1.3, 1.3, 1.3)
        // this.items.ChickenThighs.scene.position.set(x++, y, z)

    }

    debugSetup()
    {   
        const productsFolder = this.debug.addFolder('Products').open(false)
        for(const productName of this.productsName)
        {
            const item = this.experience.resources.Products[productName].scene
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
