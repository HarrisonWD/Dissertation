import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Products from './Products.js'
import ShopModel from './ShopModel.js'

export default class World{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait resources ready
        this.resources.on('ready', () => {
            //Setup 
            this.shopModel = new ShopModel()
            this.milk = new Products()
            this.environment = new Environment()
        })
    }
}