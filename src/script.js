import * as THREE from 'three'
import './style.css'
import Experience from './Experience/Experience.js'
const experience = new Experience(document.querySelector('canvas.webgl'))

const reticle = document.querySelector('.reticle')
reticle.classList.add('hidden')

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


// Cursor Tracker
experience.pointer = new THREE.Vector2()

window.addEventListener('mousemove', (_event) =>
{
    experience.music.play()
    experience.pointer.x = _event.clientX / experience.sizes.width * 2 - 1
    experience.pointer.y = - (_event.clientY / experience.sizes.height) * 2 + 1
})

// Single Click Whilst Hovering over item
window.addEventListener('click', () => {
    
})


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
    if(event.key == 'w' )
    experience.camera.pointerLockControls.moveForward(0.25) 
    if(event.key == 'a' )
    experience.camera.pointerLockControls.moveRight(-0.25) 
    if(event.key == 's' )
    experience.camera.pointerLockControls.moveForward(-0.25) 
    if(event.key == 'd' )
    experience.camera.pointerLockControls.moveRight(0.25)
    if(event.key == 'W' )
    experience.camera.pointerLockControls.moveForward(0.25) 
    if(event.key == 'A' )
    experience.camera.pointerLockControls.moveRight(-0.25) 
    if(event.key == 'S' )
    experience.camera.pointerLockControls.moveForward(-0.25) 
    if(event.key == 'D' )
    experience.camera.pointerLockControls.moveRight(0.25)
})

//Pointer Camera Enabled
window.addEventListener('keydown', (event) => 
{
    if(event.key == 'f'){
        if(experience.camera.pointerLockControls.isLocked == true)
        {
            reticle.classList.add('hidden')
            experience.camera.pointerLockControls.unlock()
            experience.camera.orbitControls.enablePan = true
        }
        else 
        {
            reticle.classList.remove('hidden')
            experience.camera.pointerLockControls.lock()
            experience.camera.orbitControls.enablePan = false
        }
    }
    if(event.key == 'F'){
        if(experience.camera.pointerLockControls.isLocked == true)
        {
            reticle.classList.add('hidden')
            experience.camera.pointerLockControls.unlock()
            experience.camera.orbitControls.enablePan = true
        }
        else 
        {
            reticle.classList.remove('hidden')
            experience.camera.pointerLockControls.lock()
            experience.camera.orbitControls.enablePan = false
        }
    }
})