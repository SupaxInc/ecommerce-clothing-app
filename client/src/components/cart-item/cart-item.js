import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, addItem, clearItemFromCart } from '../../redux/cart/cart.actions';

import './cart-item.scss';

const CartItem = ({ item }) => {
    const { imageUrl, price, name, quantity} = item;
    const dispatch = useDispatch();

    return (
        <div className='cart-item'>
            <img className='image' src={imageUrl} alt=''/>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>
                    {quantity} x ${price}
                </span>
                <span className='quantity'>
                    <div className="arrow" onClick={() => dispatch(removeItem(item))}>&#10094;</div>
                    <div className="arrow" onClick={() => dispatch(addItem(item))}>&#10095;</div>
                </span>
            </div>
            <div className='remove-button' onClick={() => dispatch(clearItemFromCart(item))}>&#10005;</div>
        </div>
    );
}

export default React.memo(CartItem);