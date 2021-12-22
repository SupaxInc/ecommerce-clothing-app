import React from "react";

import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({ children, ...props }) => {
    return (
        <CustomButtonContainer {...props}>
            {
                /*
                    Children property allows us to grab the 
                    elements wrapped inside the CustomButton component.
                */
            }
            {children}
        </CustomButtonContainer>
    )
}

export default CustomButton;