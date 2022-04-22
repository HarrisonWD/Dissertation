import * as THREE from 'three'
import { gsap } from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import EventEmitter from './EventEmitter.js'
import Experience from '../Experience.js'



export default class Resources extends EventEmitter 
{
    constructor(sources)
    {
        super()

        // Options
        this.sources = sources
    
        // Setup 
        this.items = {}
        this.products = {}
        this.toLoad = this.sources.length

        this.loaded = 0
        this.experience = new Experience
        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        const loadingBarElement = document.querySelector('.loading-bar')
        const overlayMaterial = this.experience.scene.children[0].material
        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () => {
                gsap.delayedCall(0.7, () => {
                    gsap.to(overlayMaterial.uniforms.uAlpha,{ duration: 3, value: 0})
                    loadingBarElement.classList.add('ended')
                    loadingBarElement.style.transform = ''
                })
            },
            // Progress
            (itemsUrl, itemsLoaded, itemsTotal) => 
            {
                const progressRatio = itemsLoaded / itemsTotal
                loadingBarElement.style.transform = `scaleX(${progressRatio})`
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
        for(const source of this.sources){
            if(source.type === 'gltf'){
                this.loaders.gltfDracoLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'glb'){
                this.loaders.gltfDracoLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file
        this.loaded++

        if(this.loaded === this.toLoad){
            this.trigger('ready')
        }
    }
}