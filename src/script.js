import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import * as lil from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const textureLoader = new  THREE.TextureLoader(loadingManager)

const pointerLockBoolean = false


/** 
 * Fonts 
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/font/helvetiker_regular.typeface.json',
    (font) => 
    {
        const textGeometry = new TextGeometry(
            'Sainsboughrys', 
            {
                font: font,
                size: 0.5,
                height: 0.05,
                curveSegments: 7,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        textGeometry.center()

        const textMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xe86d1e
        })
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.set(0,10,-2)
        text.scale.set(2,2,2)
        scene.add(text)
    }
)



const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, { duration:1, y: mesh.rotation.y + Math.PI * 1})
    }
}


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null

gltfLoader.load(
    '/models/storeexample.glb',
    (gltf) => 
    {
        gltf.scene.rotateY(Math.PI * 1.5) 
        scene.add(gltf.scene)
    }
)

//Axes Helper
const axesHelper = new THREE.AxesHelper()
//scene.add(axesHelper)

//Cursor Tracker
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width -0.5
    cursor.y = event.clientY / sizes.height -0.5
})

/**
 * Lights
*/

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.9)
pointLight.position.z = 0.8
pointLight.lookAt(new THREE.Vector3)
scene.add(pointLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
scene.add(directionalLight)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Resizer Funciton
window.addEventListener('resize', () => {
    //Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    pointerCamera.aspect = sizes.width / sizes.height
    pointerCamera.updateProjectionMatrix()

    //Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//Double click full screen
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        } else if(canvas.webkitFullscreenElement) {
            canvas.webkitFullscreenElement()
        }
    } else {
        if(document.exitFullscreen){
            document.exitFullscreen()
        } else if(document.webkitFullscreenElement){
            document.exitFullscreen()
        }
    }
})

//Press 'h' to hide or show GUI menu
window.addEventListener('keydown', (event) =>
{
    if(event.key == 'h'){
        if(gui._hidden)
            gui.show()
        else
            gui.hide()
    }    
})

// Camera
const orbitCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
orbitCamera.position.set(0,15,16)
scene.add(orbitCamera)

const pointerCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
pointerCamera.position.set(0,15,16)
scene.add(pointerCamera)

//Controls
const controls = new OrbitControls(orbitCamera, canvas)
const pointerLockControls = new PointerLockControls(pointerCamera, canvas)
controls.enableDamping = true

//Pointer Camer Controls
window.addEventListener('keydown', (event) =>
{
    if(event.key == 'w')
    pointerLockControls.moveForward(0.25)
    if(event.key == 'a')
    pointerLockControls.moveRight(-0.25)
    if(event.key == 's')
    pointerLockControls.moveForward(-0.25)
    if(event.key == 'd')
    pointerLockControls.moveRight(0.25)
})

//Pointer Camera Enabled
window.addEventListener('keydown', (event) => 
{
    if(event.key == 'f'){
        if(pointerLockBoolean == false)
        pointerLockControls.lock() | pointerLockBoolean == true 
    }
})


/**
 * Debug
 */
 const gui = new lil.GUI({width: 400})
 //gui.hide()
 
 //Debug Objects
 gui
     .addColor(parameters, 'color')
     .onChange(() => {
         material.color.set(parameters.color)
     })
 const materialFolder = gui.addFolder('material')
 
 
 const lightFolder = gui.addFolder('light')
 const pointLightFolder = lightFolder.addFolder('Point Light')
 pointLightFolder.add(pointLight.position, 'x').min(-0.5).max(3).step(0.01)
 pointLightFolder.add(pointLight.position, 'y').min(-0.5).max(3).step(0.01)
 pointLightFolder.add(pointLight.position, 'z').min(-0.5).max(3).step(0.01)
 pointLightFolder.add(pointLight, 'intensity').min(-0.5).max(2).step(0.01)

 const ambientLightFolder = lightFolder.addFolder('Ambient Light')
 ambientLightFolder.add(ambientLight.position, 'x').min(-0.5).max(3).step(0.01)
 ambientLightFolder.add(ambientLight.position, 'y').min(-0.5).max(3).step(0.01)
 ambientLightFolder.add(ambientLight.position, 'z').min(-0.5).max(3).step(0.01)
 ambientLightFolder.add(ambientLight, 'intensity').min(-0.5).max(2).step(0.01)

 const directionalLightFolder = lightFolder.addFolder('Directional Light')
 directionalLightFolder.add(directionalLight.position, 'x').min(-0.5).max(3).step(0.01)
 directionalLightFolder.add(directionalLight.position, 'y').min(-0.5).max(3).step(0.01)
 directionalLightFolder.add(directionalLight.position, 'z').min(-0.5).max(3).step(0.01)
 directionalLightFolder.add(directionalLight, 'intensity').min(-0.5).max(2).step(0.01)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Clock
const clock = new THREE.Clock()

//Animate
const tick = () =>
{
    // Clock
   const elapsedTime = clock.getElapsedTime()
   //Animation
   //mesh.rotation.y = elapsedTime;

   //Update Objects


   //Update Camera
   controls.update()

   //Update Scene Size
    sizes.height = window.innerHeight
    sizes.width = window.innerWidth

    //render
    if(pointerLockBoolean == true)
    renderer.render(scene, pointerCamera)
    else
    renderer.render(scene, orbitCamera)
    
    //Call tick every frame
    window.requestAnimationFrame(tick)
}
tick()