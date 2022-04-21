import * as THREE from 'three'
import Experience from '../Experience.js'

export default class ShopModel 
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Setup
        this.resource = this.resources.items.shopModel

        // Debug 
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Shop Model')
        }

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.scene.add(this.model)

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true
            }
        })
    }
}