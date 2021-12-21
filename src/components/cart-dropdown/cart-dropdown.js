import React from 'react';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { useNavigate } from "react-router-dom";

import { selectCartItems } from '../../redux/cart/cart.selectors';

import CartItem from '../cart-item/cart-item';
import CustomButton from '../custom-button/custom-button';

import './cart-dropdown.scss';

const CartDropdown = ({cartItems, dispatch}) => {
    const navigate = useNavigate();

    return (
        <div className='cart-dropdown'>
            <div className='cart-items'> 
                {
                    cartItems.length ?
                    cartItems.map((cartItem) => {
                        return <CartItem key={cartItem.id} item={cartItem} />
                    })
                    :
                    <span className='empty-message'>Your cart is empty</span>
                }
            </div>
            <CustomButton 
                onClick={() => {
                    navigate('/checkout');
                    dispatch(toggleCartHidden());
                }}>
                GO TO CHECKOUT
            </CustomButton>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: selectCartItems(state)
    }
}

export default connect(mapStateToProps)(CartDropdown);