import * as THREE from 'three'
import Experience from '../Experience.js'

let test = null
export default class Signs
{   

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.items = this.experience.resources.Signs
        this.debug = this.experience.ui
        this.signs = []
        this.signsName = []
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
        for(const sign of this.itemsArray)
        {
            this.signsName.push(sign)                
            this.signs.push(this.experience.resources.Signs[sign])
        }
    }


    setModels()
    {   
        for(const sign of this.signs)
        {
            this.model = sign.scene
            this.model.name = this.signsName[this.count]        
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
        this.experience.resources.Signs.SignDairy.scene.position.set(-2.5, 4.5, 3)
        this.experience.resources.Signs.SignDairy.scene.scale.set(0.3, 0.3, 0.3)
        this.experience.resources.Signs.SignDairy.scene.rotateY(Math.PI * 0.5)
        this.experience.resources.Signs.SignMeat.scene.position.set(2.5, 4.5, 3)
        this.experience.resources.Signs.SignMeat.scene.scale.set(0.3, 0.3, 0.3)
        this.experience.resources.Signs.SignMeat.scene.rotateY(Math.PI * 0.5)
        this.experience.resources.Signs.SignFrozen.scene.position.set(0, 4.5, -2)
        this.experience.resources.Signs.SignFrozen.scene.scale.set(0.3, 0.3, 0.3)
        this.experience.resources.Signs.SignFrozen.scene.rotateY(Math.PI * 0.5)
    }

    debugSetup()
    {   
        const signsFolder = this.debug.addFolder('Signs').open(false)
        for(const signName of this.signsName)
        {
            const item = this.experience.resources.Signs[signName].scene
            const signFolder = signsFolder.addFolder(signName).open(false)
            const positionFolder = signFolder.addFolder('Position').open(false)
            positionFolder.add(item.position, 'x').min(-20).max(20).step(0.5)
            positionFolder.add(item.position, 'y').min(-20).max(20).step(0.5)
            positionFolder.add(item.position, 'z').min(-20).max(20).step(0.5)
            const scaleFolder = signFolder.addFolder('Scale').open(false)
            scaleFolder.add(item.scale,'x').min(-3).max(3).step(0.01)
            scaleFolder.add(item.scale,'y').min(-3).max(3).step(0.01)
            scaleFolder.add(item.scale,'z').min(-3).max(3).step(0.01)
        }
    }
        
       
}