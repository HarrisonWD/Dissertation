import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Shelves
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Setup
        this.resource = this.resources.items.Shelves

        this.shevles1 = this.resource.scene.clone()
        this.shevles2 = this.resource.scene.clone()

        // Debug 
        if(this.debug.active)
        {
            //this.debug.ui.addFolder('Shop Model')
        }

        this.setModel()
        this.setModelParameters()
    }

    setModel()
    {
        this.scene.add(this.shevles1)
        this.scene.add(this.shevles2)        
    }

    setModelParameters()
    {
        this.shevles1.position.set(4,0.1,3)
        this.shevles2.position.set(4,0.1,-2)
    }
}