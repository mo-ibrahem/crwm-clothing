import './checkout-item.styles.scss'

const CheckOutItem = ({cartItem, removeCartItem, addItemToCart, decrementCartItem})=>{
   
    const {name, imageUrl, price, quantity} = cartItem
    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={() => decrementCartItem(cartItem)} className="arrow">&#10094;</div>
                <span className="value">{quantity}</span>
                <div onClick={() => addItemToCart(cartItem)} className="arrow">&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className="remove-button" onClick={() => removeCartItem(cartItem)}>&#10005;</div>
        </div>
    )

}

export default CheckOutItem