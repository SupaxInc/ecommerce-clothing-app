import React from "react";
import { useNavigate } from "react-router-dom";
import './menu-item.scss';

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
    // No longer need to use withRouter due to the new version of react-hook
    // useNavigate() is a hook that allows us to navigate to another page render instead of using location
    let navigate = useNavigate();

    return (
        <div className={`${size ? size : ''} menu-item`} onClick={() => navigate(linkUrl)}>
            <div 
                className="background-image" 
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className='content'>
                <h1 className='title'>{title.toUpperCase()}</h1>
                <span className='sub-title'>SHOP NOW</span>
            </div>
        </div>
    ) 
}

export default MenuItem;