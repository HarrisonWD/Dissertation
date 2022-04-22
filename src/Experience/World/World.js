import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Milk from './Milk.js'
import ShopModel from './ShopModel.js'

export default class World{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        //Test Mesh

        const boxGeometry = new THREE.BoxGeometry(2,2,2)

        // const box1 = new THREE.Mesh( boxGeometry,
        //     new THREE.MeshStandardMaterial( { color: 0xff0000} ) );
        // box1.position.set(0,0,8)
        // box1.name = 'Ceareal'
        // this.experience.objectsToInteract.push(box1)
        // this.scene.add(box1)

        // const box2 = new THREE.Mesh( 
        //     boxGeometry, 
        //     new THREE.MeshStandardMaterial( { color: 0xff0000} ) );
        // box2.position.set(-4,0,8)
        // box2.name = 'Milk'
        // this.experience.objectsToInteract.push(box2)
        // this.scene.add(box2)

        // const box3 = new THREE.Mesh( 
        //     boxGeometry,
        //     new THREE.MeshStandardMaterial( { color: 0xff0000} ));
        // box3.position.set(4,0,8)
        // box3.name = 'JaffaCakes'
        // this.experience.objectsToInteract.push(box3)
        // this.scene.add(box3)
        
        // Wait resources ready
        this.resources.on('ready', () => {
            //Setup 
            this.shopModel = new ShopModel()
            this.milk = new Milk()
            this.environment = new Environment()
        })

        

    }
}