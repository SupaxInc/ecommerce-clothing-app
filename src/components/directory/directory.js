import React, { Component } from "react";
import './directory.scss';
import MenuItem from "../menu-item/menu-item";
import { sections } from "./directory.data";

class Directory extends Component {
    constructor() {
        super();
        this.state = {
            sections: sections
        }
    }

    render() {
        const { sections } = this.state;
        return (
            <div className="directory-menu">
                {
                    sections.map(({ id,...otherProps }) => {
                        // Object spreading below of ...otherProps is similar to title={title} imageUrl={imageUrl} etc...
                        return <MenuItem key={id} {...otherProps} />
                    })
                }
            </div>
        )
    }

}

export default Directory;