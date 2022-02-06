import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const LinkComponent = ({displayName, children, link}) => {
    return (
        <Link displayName={displayName} to={link}>
            {children}
        </Link>
    )
};

// Check the types being passed from props
LinkComponent.propTypes = {
    displayName: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
}

export default LinkComponent