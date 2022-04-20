import * as lil from 'lil-gui'
import Experience from '../Experience.js'

export default class Debug 
{
    constructor()
    {
        this.active = window.location.hash === '#debug'
        this.experience = new Experience()

        if(this.active)
        {
            this.experience.ui = new lil.GUI({width:400})
        }
    }
}