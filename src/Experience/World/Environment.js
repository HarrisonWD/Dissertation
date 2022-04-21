import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment {
    constructor()
    {
        // Minimal cost:
        // AmbientLight
        // HemisphereLight

        // Moderate cost:
        // DirectionalLight
        // PointLight

        // High cost:
        // SpotLight
        // RectAreaLight

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.setSunLight()
        
        this.setAmbientLight()
    }

    setSunLight()
    {
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
        this.directionalLight.castShadow = true
        this.directionalLight.position.set(3,10,4)
        this.scene.add(this.directionalLight)
    }

    setAmbientLight(){
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
        this.scene.add(this.ambientLight)
    }
}