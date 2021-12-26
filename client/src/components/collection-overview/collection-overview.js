import React from "react";
import { useSelector } from "react-redux";
import CollectionPreview from "../collection-preview/collection-preview";

import { selectShopCollectionsForPreview } from '../../redux/shop/shop.selector';

import './collection-overview.scss';

const CollectionOverview = () => {
    const collections = useSelector(selectShopCollectionsForPreview);
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

export default CollectionOverview;