import React from "react";

import './custom-button.scss'

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => {
    return (
        <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
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