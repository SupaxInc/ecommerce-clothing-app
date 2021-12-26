import React from "react";
import MenuItem from "../menu-item/menu-item";

import { useSelector } from "react-redux";
import { selectDirectorySections } from "../../redux/directory/directory.selector";

import './directory.scss';


const Directory = () => {
    const sections = useSelector(selectDirectorySections)
    return (
        <div className="directory-menu">
            {
                sections.map(({ id,...otherProps }) => {
                    // Object spreading below of ...otherProps is similar to title={title} imageUrl={imageUrl} etc...
                    return <MenuItem key={id} {...otherProps} />
                })
            }
        </div>
    );
}


export default Directory;