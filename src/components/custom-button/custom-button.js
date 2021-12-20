import React from "react";

import './custom-button.scss'

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => {
    return (
        <button className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
            {
                /*
                    Children property allows us to grab the 
                    elements wrapped inside the CustomButton component.
                */
            }
            {children}
        </button>
    )
}

export default CustomButton;