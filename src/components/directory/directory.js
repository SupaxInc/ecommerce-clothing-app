import React from "react";
import MenuItem from "../menu-item/menu-item";

import { connect } from "react-redux";
import { selectDirectorySections } from "../../redux/directory/directory.selector";

import './directory.scss';


const Directory = ({ sections }) => {
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

const mapStateToProps = (state) => {
    return {
        sections: selectDirectorySections(state)
    }
}

export default connect(mapStateToProps)(Directory);