import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    // Stripe requires payments to be made in cents.
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51K9FlsBPiEvsEX2d1xh2DhbdA6SU8TuiA6vyQp9iJwWKDNN4UvDp3Kcr91vQvfnVKe1ybaSsWD8FR4ll2XZEF99k00KG5Beqal';

    // Triggers when the payment was successful which returns an object of the entered information
    const onToken = token => {
        alert('Payment Successful');
    }

    // Lots of props to send to the StripeCheckout component, check out the docs
    return (
        <StripeCheckout
            label='Pay Now'
            name='Ecommerce Clothing'
            billingAddress
            shippingAddress
            description={`Your total is $${price}.`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;