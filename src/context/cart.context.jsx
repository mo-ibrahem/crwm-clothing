import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) =>{
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

    if(existingCartItem){
        return cartItems.map((cartItem)=>
            cartItem.id === productToAdd.id ? {...cartItem, 'quantity': cartItem.quantity+1}: cartItem
        )
    }
    return [...cartItems, {...productToAdd, quantity: 1}]
}

export const CartContext = createContext({
   isCartOpen:false,
   setIsCartOpen: () => {}, 
   cartItems:[],
   addItemToCart: () => {},
   decrementCartItem: () => {},
   cartCount: 0,
   cartTotal: 0
})

const INITIAL_STATE ={
    isCartOpen:false,
    cartItems:[],
    cartCount: 0,
    cartTotal: 0

}

const cartReducer = (state, action) =>{
    const {type, payload} = action;
 
    switch(type){
        case 'SET_CART_ITEMS':
            return{
                ...state,
                ...payload
            }
        default:
            throw new Error('unhandled type of cart reducer')
    }
}

export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() =>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0)
        setCartCount(newCartCount)
    },[cartItems])

    useEffect(() =>{
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0)
        setCartTotal(newCartTotal)
    },[cartItems])

    const decrementCartItem = (itemToDecrement) =>{
        const itemToRemove = cartItems.find((cartItem) => cartItem.id === itemToDecrement.id)
        if(itemToRemove.quantity === 1){
            const removedd = cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id)
            setCartItems(removedd)
            return
        }
        const removed = cartItems.map((cartItem) => cartItem.id === itemToRemove.id ?{...cartItem,'quantity':cartItem.quantity-1}:cartItem)
        setCartItems(removed)
    }
    const updateCartItemsReducer = (newCartItems) =>{

    }
    const removeCartItem = (itemToBeRemoved) =>{
       
            const removedd = cartItems.filter((cartItem) => cartItem.id !== itemToBeRemoved.id)
            setCartItems(removedd)
         
    }

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount,decrementCartItem,removeCartItem, cartTotal }

   

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};