import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

export default class Controls extends EventEmitter{
    constructor(){
        super()

        this.experience = new Experience()
        
    }

    addProductToCart(product){
        console.log(product)
    }


}