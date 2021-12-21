import React from "react";
import { connect } from "react-redux";
import CollectionPreview from "../collection-preview/collection-preview";

import { selectShopCollections } from '../../redux/shop/shop.selector';

import './collection-overview.scss';

const CollectionOverview = ({collections}) => {
    return (
        <div className="collections-overview">
            {
                collections.map(({ id, ...otherProps}) => {
                    return <CollectionPreview key={id} {...otherProps} />
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        collections: selectShopCollections(state)
    }
}

export default connect(mapStateToProps)(CollectionOverview);