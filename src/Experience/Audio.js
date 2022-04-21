import * as THREE from 'three'
import Experience from './Experience';

export default class Music {
    constructor(){
        this.experience = new Experience()
        this.sound = new Audio("Sappheiros-Home.mp3")
        this.sound.muted = false
        this.sound.loop = true
        this.sound.volume = 0.3
    }

    pause(){
        this.sound.muted = true
    }

    play(){
        this.sound.play();
    }
}