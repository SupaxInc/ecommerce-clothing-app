import React from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button";
import { connect } from "react-redux";

import { selectCartItems, selectCartItemsTotal } from "../../redux/cart/cart.selectors";

import './checkout.scss'


const CheckoutPage = ({ cartItems, cartItemsTotal }) => {
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((item) => {
                    return <CheckoutItem key={item.id} cartItem={item}/>
                })
            }
            <div className="total">
                <span>TOTAL ${cartItemsTotal}</span>
            </div>
            <div className="test-warning">
                Please use the following test credit card to test payments: <br />
                4242 4242 4242 4242 - Exp: 01/24 - CVV: 123
            </div>
            <StripeCheckoutButton price={cartItemsTotal}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cartItems: selectCartItems(state),
        cartItemsTotal: selectCartItemsTotal(state)
    }
    
}

export default connect(mapStateToProps)(CheckoutPage);