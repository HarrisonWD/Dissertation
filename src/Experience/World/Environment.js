import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment {
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.setSunLight()
        
    }

    setSunLight()
    {
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
        this.directionalLight.castShadow = true
        this.directionalLight.position.set(3,10,4)
        this.scene.add(this.directionalLight)
    }
}