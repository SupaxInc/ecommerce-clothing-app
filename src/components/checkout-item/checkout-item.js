import React from "react";
import { connect } from "react-redux";
import { clearItemFromCart } from "../../redux/cart/cart.actions";

import './checkout-item.scss';

const CheckoutItem = ({ cartItem, clearItemFromCart }) => {
    const {name, imageUrl, price, quantity} = cartItem;

    return (
        <div className="checkout-item">
            <div className="image-container">
                <img className='image' src={imageUrl} alt='item'/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">{quantity}</span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={() => clearItemFromCart(cartItem)}>&#10005;</div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearItemFromCart: item => dispatch(clearItemFromCart(item))
    }
}

export default connect(null, mapDispatchToProps)(CheckoutItem);