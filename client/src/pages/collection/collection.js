import React from "react";
import CollectionItem from "../../components/collection-item/collection-item";

import { useSelector } from "react-redux";

import { selectShopCollectionsId } from "../../redux/shop/shop.selector";

import './collection.scss';

import { useParams } from "react-router-dom";

const CollectionPage = () => {
    // Params returns us the relative path or a parameter id
    const { categoryId } = useParams();
    const collection = useSelector(selectShopCollectionsId(categoryId));
    const { title, items } = collection;


    return (
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {
                    items.map(item => {
                        return <CollectionItem key={item.id} item={item} />
                    })
                }
            </div>
        </div>
    )
}

// Using higher order component withRouter to return params as a prop
export default CollectionPage;