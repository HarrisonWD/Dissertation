import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Products from './Products.js'
import Shelves from './Shelves.js'
import ShopModel from './ShopModel.js'
import Signs from './Signs.js'

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
            this.shelves = new Shelves()
            this.products = new Products()
            this.signs = new Signs()
            this.environment = new Environment()
        })
    }
}