import { name } from 'file-loader'
import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

let instance = null

export default class Cart extends EventEmitter{
    constructor(){
        super()
        if(instance){
            return instance
        }
        this.shoppingcart = document.getElementsByClassName('.cart-list')
        instance = this
        this.experience = new Experience()
    }

    addProductToCart(product){
        console.log(product)
        let newListItem = document.createElement('li')
        newListItem.setAttribute("class", "list-group-item")
        let firstColumn = document.createElement('div')
        firstColumn.setAttribute("class", "col-4 m-auto")
        let firstColumnText = document.createElement('h6')
        firstColumnText.setAttribute("class", "m-auto")
        firstColumnText.textContent(product[name])
        let secondColumn = document.createElement('div')
        secondColumn.setAttribute("class", "col-4 m-auto d-flex")
        let quantityForm = document.createElement('div')
        quantityForm.setAttribute("class", "input-group d-flex quantity-form d-flex")
        let quantityFormSpan = document.createElement('span')
        quantityFormSpan.setAttribute("class", "input-group-text quantity-text d-flex")



        quantityForm.appendChild(quantityFormSpan)
        secondColumn.appendChild(quantityForm)
        firstColumn.appendChild(firstColumnText)
        newListItem.appendChild(firstColumn, secondColumn)
        this.shoppingcart.appendChild(newListItem)
    }


}