import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    top: 0;
    position: sticky;
    background: white;
    z-index: 1;

    @media screen and (max-width: 800px) {
        height: 60px;
        padding: 10px;
        margin-bottom: 20px;
    }
`;

// Creating a styled component that joins the Link component
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;

    @media screen and (max-width: 800px) {
        width: 50px;
        padding: 0;
    }
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media screen and (max-width: 800px) {
        width: 80%;
    }
`;

// option css class is being used by more than one HTML element <div> and <Link> components
// therefore, we need to create a css style for it 
// then we can implement the css style to the multiple HTML elements
export const OptionContainer = css`
    padding: 10px 15px;
    cursor: pointer;
`;

// Adding the OptionContainer CSS style to the Link component that uses option class
export const OptionLink = styled(Link)`
    ${OptionContainer}
`;
// Pass a display name property to the OptionLink styled component to be able to be used in tests
OptionLink.displayName = "OptionLink";
