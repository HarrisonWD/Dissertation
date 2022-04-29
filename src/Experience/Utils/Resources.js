import * as THREE from 'three'
import { gsap } from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import EventEmitter from './EventEmitter.js'
import Experience from '../Experience.js'

let sourceType = null
let sourcesLength = null
let sourcesPrimed = []
let sourcesNames = []
let witness = 0
export default class Resources extends EventEmitter 
{
    constructor(sources)
    {
        super()

        // Options
        this.sources = sources

        // Setup 
        this.Products = {}
        this.Shop = {}
        this.Shelves = {}
        this.Signs= {}
        this.primeSource()
        this.toLoad = sourcesLength
        this.loaded = 0
        this.experience = new Experience
        this.setLoaders()
        this.startLoading()
    }

    primeSource(){
        sourceType = this.sources[0]
        sourcesNames = Object.getOwnPropertyNames(sourceType)
        for(let name of sourcesNames){
            sourcesLength += sourceType[name].length
            sourcesPrimed[name] = sourceType[name]
        } 
    }

    setLoaders()
    {
        const loadingBarElement = document.querySelector('.loading-bar')
        const overlayMaterial = this.experience.scene.children[0].material
        const loadingText = document.querySelector('.loading-text')
        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () => {
                gsap.delayedCall(0.7, () => {
                    gsap.to(overlayMaterial.uniforms.uAlpha,{ duration: 3, value: 0})
                    loadingBarElement.classList.add('ended')
                    loadingText.classList.add('ended')
                    loadingBarElement.style.transform = ''
                    loadingText.style.transform = ''
                })
            },
            // Progress
            (itemsUrl, itemsLoaded, itemsTotal) => 
            {
                const progressRatio = itemsLoaded / itemsTotal
                loadingBarElement.style.transform = `scaleX(${progressRatio})`
                loadingText.style.transform = `scaleX(1)`
            }
        )
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        this.loaders.dracoLoader = new DRACOLoader(this.loadingManager)
        this.loaders.dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/') 
        this.loaders.gltfDracoLoader = this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }

    startLoading()
    {
        for(let name of sourcesNames){
            for(const source of sourceType[name]){
                    if(source.type === 'gltf'){
                    this.loaders.gltfDracoLoader.load(
                        source.path,
                        (file) => {
                            this.sourceLoaded(name, source, file)
                        }
                    )
                    }
                    else if(source.type === 'glb'){
                        this.loaders.gltfDracoLoader.load(
                            source.path,
                            (file) => {
                                this.sourceLoaded(name, source, file)
                        }
                    )
                }
            }
        }
    }

    sourceLoaded(name, source, file)
    {
        this[name][source.name] = file
        this.loaded++
        if(this.loaded === this.toLoad){
            this.trigger('ready')
        }
        witness = null
    }
}