import * as THREE from 'three'
import './style.css'
import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))

// /** 
//  * Fonts 
//  */
// const fontLoader = new FontLoader()

// /**
//  * Text
//  */
// fontLoader.load(
//     '/font/helvetiker_regular.typeface.json',
//     (font) => 
//     {
//         const textGeometry = new TextGeometry(
//             'Sainsboughrys', 
//             {
//                 font: font,
//                 size: 0.5,
//                 height: 0.05,
//                 curveSegments: 7,
//                 bevelEnabled: true,
//                 bevelThickness: 0.01,
//                 bevelSize: 0.02,
//                 bevelOffset: 0,
//                 bevelSegments: 4
//             }
//         )
//         textGeometry.center()

//         const textMaterial = new THREE.MeshStandardMaterial({ 
//             color: 0xe86d1e
//         })
//         const text = new THREE.Mesh(textGeometry, textMaterial)
//         text.position.set(0,10,-2)
//         text.scale.set(2,2,2)
//         scene.add(text)
//     }
// )



// /**
//  * Models
//  */
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('/draco/')

// const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)

// let mixer = null

// gltfLoader.load(
//     '/models/storeexample.glb',
//     (gltf) => 
//     {
//         gltf.scene.rotateY(Math.PI * 1.5) 
//         scene.add(gltf.scene)
//     }
// )

// /**
//  * Objects
//  */


// Cursor Tracker
experience.pointer = new THREE.Vector2()

window.addEventListener('mousemove', (_event) =>
{
    experience.pointer.x = _event.clientX / experience.sizes.width * 2 - 1
    experience.pointer.y = - (_event.clientY / experience.sizes.height) * 2 + 1
})

// /**
//  * Lights
// */

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 0.9)
// pointLight.position.z = 0.8
// pointLight.lookAt(new THREE.Vector3)
// scene.add(pointLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
// scene.add(directionalLight)




//Double click full screen
window.addEventListener('dblclick', () => {

})

//Press 'h' to hide or show GUI menu
window.addEventListener('keydown', (event) =>
{
    if(event.key == 'h'){
        
    }    
})

//Pointer Camera Controls
window.addEventListener('keydown', (event) =>
{
    if(event.key == 'w')
    experience.camera.pointerLockControls.moveForward(0.25) 
    if(event.key == 'a')
    experience.camera.pointerLockControls.moveRight(-0.25) 
    if(event.key == 's')
    experience.camera.pointerLockControls.moveForward(-0.25) 
    if(event.key == 'd')
    experience.camera.pointerLockControls.moveRight(0.25)
})

//Pointer Camera Enabled
window.addEventListener('keydown', (event) => 
{
    if(event.key == 'f'){
        if(experience.camera.pointerLockControls.isLocked == true)
        {
            experience.camera.pointerLockControls.unlock()
            experience.camera.orbitControls.enablePan = true
        }
        else 
        {
            experience.camera.pointerLockControls.lock()
            experience.camera.orbitControls.enablePan = false
        }
        
    }
})


// /**
//  * Debug
//  */
//  const gui = new lil.GUI({width: 400})
//  //gui.hide()
 
//  //Debug Objects
//  gui
//      .addColor(parameters, 'color')
//      .onChange(() => {
//          boxMaterial.color.set(parameters.color)
//      })
//  const materialFolder = gui.addFolder('material')
 
 
//  const lightFolder = gui.addFolder('light')
//  const pointLightFolder = lightFolder.addFolder('Point Light')
//  pointLightFolder.add(pointLight.position, 'x').min(-0.5).max(3).step(0.01)
//  pointLightFolder.add(pointLight.position, 'y').min(-0.5).max(3).step(0.01)
//  pointLightFolder.add(pointLight.position, 'z').min(-0.5).max(3).step(0.01)
//  pointLightFolder.add(pointLight, 'intensity').min(-0.5).max(2).step(0.01)

//  const ambientLightFolder = lightFolder.addFolder('Ambient Light')
//  ambientLightFolder.add(ambientLight.position, 'x').min(-0.5).max(3).step(0.01)
//  ambientLightFolder.add(ambientLight.position, 'y').min(-0.5).max(3).step(0.01)
//  ambientLightFolder.add(ambientLight.position, 'z').min(-0.5).max(3).step(0.01)
//  ambientLightFolder.add(ambientLight, 'intensity').min(-0.5).max(2).step(0.01)

//  const directionalLightFolder = lightFolder.addFolder('Directional Light')
//  directionalLightFolder.add(directionalLight.position, 'x').min(-0.5).max(3).step(0.01)
//  directionalLightFolder.add(directionalLight.position, 'y').min(-0.5).max(3).step(0.01)
//  directionalLightFolder.add(directionalLight.position, 'z').min(-0.5).max(3).step(0.01)
//  directionalLightFolder.add(directionalLight, 'intensity').min(-0.5).max(2).step(0.01)

