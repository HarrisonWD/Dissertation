import * as THREE from 'three'
import Experience from '../Experience.js'

let instance = null

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

        if(instance){
            return instance
        }
        instance = this

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.ui
        this.setSunLight()
        this.setAmbientLight()
        this.setPlain()
        this.setGreenLight()
        this.setRedLight()

        if(this.experience.debug.active)
        {
            this.debugSetup()
        }
    }

    setGreenLight(){
        this.greenLight = new THREE.PointLight( 0x23d18b, 4, 3, 1 )
        this.greenLight.castShadow = true
        this.greenLight.position.set(-3,0.5,9)
        this.scene.add(this.greenLight)
    }

    setRedLight(){
        this.redLight = new THREE.PointLight( 0xca4e3e, 4, 3, 1 )
        this.redLight.castShadow = true
        this.redLight.position.set(-8.5,0.5,9)
        this.scene.add(this.redLight)
    }

    setPlain(){
        this.plain = new THREE.PlaneGeometry(100, 100, 1, 1)
        this.plainMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 })
        this.plainMesh = new THREE.Mesh(this.plain, this.plainMaterial)
        this.plainMesh.rotateX(Math.PI * 0.5)
        this.plainMesh.rotateY(Math.PI * 1)
        this.plainMesh.castShadow = true
        this.scene.add(this.plainMesh)
    }

    setSunLight()
    {
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 2)
        this.directionalLight.castShadow = true
        this.directionalLight.position.set(3,10,4)
        this.scene.add(this.directionalLight)
    }

    setAmbientLight(){
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
        this.scene.add(this.ambientLight)
    }

    debugSetup(){
        const lightsFolder = this.debug.addFolder('Lights').open(false)
        const greenLight = lightsFolder.addFolder('Green Light').open(false)
        greenLight.add(this.greenLight.position, 'x').min(-20).max(20).step(0.5)
        greenLight.add(this.greenLight.position, 'y').min(-20).max(20).step(0.5)
        greenLight.add(this.greenLight.position, 'z').min(-20).max(20).step(0.5)
        //greenLight.add(this.greenLight.intensity, 'intensity').min(-20).max(20).step(0.5)
    }
}