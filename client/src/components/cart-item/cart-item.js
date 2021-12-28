import React from 'react';

import './cart-item.scss';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
    return (
        <div className='cart-item'>
            <img className='image' src={imageUrl} alt=''/>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>
                    {quantity} x ${price}
                </span>
            </div>
        </div>
    );
}

export default React.memo(CartItem);