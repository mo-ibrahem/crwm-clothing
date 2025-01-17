import './cart-item.styles.scss'

const CartItem = ({cartItem}) =>{
    const {name, imageUrl,quantity, price} = cartItem;
    return(
        <div className='cart-item-container'>
            <img src={imageUrl} alt={name}></img>
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="quantity">{quantity} x ${price}</span>
            </div>
           
        </div>
    )
}

export default CartItem