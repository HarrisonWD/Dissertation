import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.Js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Environment from './World/Environment.js'
import Resources from './Utils/Resources.js'
import Debug from './Utils/Debug.js'
import sources from './sources.js'
import products from './Products.json'
import Music from './Audio.js'

let instance = null

export default class Experience
{
    constructor(canvas){
        if(instance){
            return instance
        }
        instance = this
        
        //global access
        // window.experience = this

        //Options
        this.canvas = canvas

        //Setup
        this.objectsToInteract = []
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.environment = new Environment()
        this.raycaster = new THREE.Raycaster()
        this.products = products
        this.music = new Music()

        //Sizes resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        //Time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.renderer.update()
    }

    
}