import * as THREE from 'three'
import Experience from '../Experience.js'

let INTERSECTED = null

export default class Raycaster
{
    constructor()
    {
        this.experience = new Experience();
        this.Raycaster = this.experience.raycaster

        this.setInstance(controls)    
    }

    setInstance(controls){

    }
}