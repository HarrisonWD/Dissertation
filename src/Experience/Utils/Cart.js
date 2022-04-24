import Experience from '../Experience.js'
import EventEmitter from './EventEmitter.js'

let instance = null
let cartList = null
let itemCheck = null
export default class Cart extends EventEmitter{
    constructor(){
        super()
        if(instance){
            return instance
        }
        instance = this
        this.experience = new Experience()
    }

    testremove(){
        console.log('test')
    }
    
    addProductToCart(product){
        const idName = product.name.replace(' ', '-')
        cartList = document.getElementById('cart-list')
        itemCheck = document.getElementById(idName)
        if(itemCheck){
            const quantity = itemCheck.getElementsByClassName("form-control")
            quantity[0].value++
            
        } else {
            const newItem = `
            <li class="list-group-item" id="${idName}">
                <div class="row quantity-row">
                    <div class="col-5 m-auto">
                        <h6 class="m-auto" id="item">${product.name}</h6>
                    </div>
                    <div class="col-2 m-auto d-flex">
                        <h6 id="price-symbol">£</h6>
                        <p class="m-auto">${product.price}</p>
                    </div>
                    <div class="col-2 m-auto d-flex">
                        <div class="input-group d-flex quantity-form d-flex">
                            <input type="text" class="form-control d-flex" id="quantity" aria-describedby="basic-addon3" value="1">
                        </div>
                    </div>
                    <div class="col-3 m-auto d-flex quantity-buttons">
                        <button class="btn btn-primary" onclick="add(this)" type="submit">+</button>
                        <button class="btn btn-primary" onclick="remove(this)" type="submit">-</button>
                        <button class="btn btn-outline-danger" id="remove" onclick="removeItem(this)" type="submit">X</button>
                    </div>
                </div>
            </li>
            `
            cartList.insertAdjacentHTML('beforeend', newItem)
        }
        cartList = null
    }

    

}